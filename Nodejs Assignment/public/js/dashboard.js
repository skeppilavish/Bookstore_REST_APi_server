const table = document.getElementById('bookTable');
const tableBody = document.getElementById('tablerows');

console.log("Connected to Book Dashboard")

logout.addEventListener('click', async(event)=>{
    event.preventDefault(); // avoid refresh
    localStorage.clear();
    console.log("Token Removed Succesfully")
    alert("Logut Succesfully... Redirecting to Login Page")
    window.location.href = "index.html";
})


ok.addEventListener('click', async () =>{
    console.log("In async");
  try {
    const query=document.querySelector('#query').value
    if(query>0)
    {
        console.log("queries to show :",query);
        const response = await fetch('http://localhost:3000/books?query='+query);
      // console.log("blah blah:",response)
        const data = await response.json();
        const book=data.booksData
        //console.log("Pura Data:", data);
        tableBody.innerHTML = '';
        book.forEach(item => {
            console.log("Printing item:", item);
          const row = document.createElement('tr');
          row.innerHTML =       
          `
            <td>${item.title}</td>
            <td>${item.author}</td>
            <td>${item.genre}</td>
            <td>${item.price}</td>
            <td>${item.stock}</td>
          `;
          
          console.log(row);
          tableBody.appendChild(row);
        });
      }
      else{
        console.log("Negative Query entered")
        alert("Invalid Query")
      }
  } catch (err) {
    console.error("In catch of book data:" ,err);
    Sentry.captureException(Error, "Not fetch Book data")
  }
})
