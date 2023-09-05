const registration = document.getElementById("registration");

function myFunction() {
    alert("Redirecting you to Login Page :)")
    window.location.href="index.html";
}


register.addEventListener("click", async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const role = document.querySelector("#role").value;
  if (!name || !email || !password) {
    alert("Please fill all the fields");
  } else {
    try {
      const url = "http://localhost:3000/auth/register";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "name": name,
            "email": email,
            "password": password,
            "role": role,
          }),
      });
      // Data in JSON
      const data = await response.json();
      if(data.code===11000)
      {
        // alert("Already Registered. Please Login");
        
            var txt;
            if (confirm("Already Registered. Please Login\n Press Ok for Login Page!")) {
              txt = "To Login Page";
              window.location.href = "index.html";
            } else {
              txt = "Continue!";
        }
        
      }
      console.log(data);
    //   window.location.href = "index.html";
      
    } catch (error) {
      alert("Something went wrong!");
      console.log(error);
    }
  }
});

// await axios({
//     method: "post",
//     url: "/auth/register", //this is where we are sending our data to register route in server side
//     data: {
//       username: `${name}`,
//       email: `${email}`,
//       password: `${password}`,
//       role_id: `${role}`,
//     },
//     headers: {},
//   })
//     .then((response) => {
//       console.log(`User ${name} has been registered`);
//     })
//     .catch(() => {
//       alert("Something went wrong!");
//     });