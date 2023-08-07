const table = document.getElementById('bookTable');
const tableBody = document.getElementById('tablerows');

console.log("Connected to Book Dashboard")

document.addEventListener('click', async(event)=>{
    event.preventDefault(); // avoid refresh
    localStorage.clear();
    console.log("Token Removed Succesfully")
    alert("Logut Succesfully... Redirecting to Login Page")
    window.location.href = "index.html";
})

document.addEventListener('DOMContentLoaded', async () =>{
    console.log("In async");
  try {
    const response = await fetch('http://localhost:3000/books/all');
   // console.log("blah blah:",response)
    const data = await response.json();
    //console.log("Pura Data:", data);
    tableBody.innerHTML = '';
    data.forEach(item => {
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
  } catch (err) {
    console.error("In catch of book data:" ,err);
    Sentry.captureException(Error, "Not fetch Book data")
  }
})
