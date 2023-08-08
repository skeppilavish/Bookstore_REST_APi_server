// Add sentry

//const Sentry= require("Sentry")

// main.js
const loginForm = document.getElementById('loginForm');
const clarity= document.getElementById('clarity')

// to remove token
clarity.addEventListener('click', async(event)=>{
    event.preventDefault(); // avoid refresh
    localStorage.clear();
    console.log("Done remove")
})

//Event listener for form submission
/// what to add
  /*
  1. expiry time to localstorage
  2. or add button in ststem to remove 
  3. wrong or true id
  */

lavish.addEventListener('click', async (event) => {
  event.preventDefault();
// Get username and password from the form
const email= document.getElementById('email').value;
const password = document.getElementById('password').value;

//Start of Javascript file
console.log("start")

  if(!localStorage.getItem('access_token'))
  {

    // console.log("in if")  // to check its working and print email , password
    // console.log("Testinggg",{email,password})
    try {
            const url= "http://localhost:3000/auth/login"
            // const body= JSON.stringify({ "email": email , "password":password})
            // console.log("body after stringify: ", body)
        // Send a POST request to the login API endpoint
         const response= await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({ "email": email , "password":password}),
         } );

         // Data in JSON
        const data = await response.json();

         // Check response is ok or not
        if (response.ok) {
            //const s = data.token.length();
            console.log("in ifif:" ,typeof(data.token));
            const token = data.token[data.token.length-1].token;
            console.log("hello token is here: ", token)
            localStorage.setItem('access_token', token);
            window.location.href = "books.html";
            // window.location.href = "localhost:3000/books"; // Replace 'books.html' with the URL of your all books page
            } 
            else if (data.message){
                console.log("1234",data);
            alert("Unregisterd User") // gives window popup with ok button
            }
        //const data = await response.json();
        //messageOne="Check at console for now"
        // If login is successful, store the access token in localStorage
    }catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
        Sentry.captureException(error)
    }
    }

    else{
        try {
            const token = localStorage.getItem("access_token")
            console.log(token)
            window.location.href = "books.html";
        } catch(error){
            console.log("Error in Redirecting",error)
            Sentry.captureException(error)
        }
    }
    });







