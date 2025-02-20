function loadCustomer(){
  fetch("http://localhost:8080/customer/get-all")
  .then(res=>res.json())
  .then(data=>{
    let tableRow='';
    data.forEach(customer=>{
      tableRow+=`
        <tr>
          <td>${customer.id}</td>
          <td>${customer.name}</td>
          <td>${customer.address}</td>
          <td>${customer.salary}</td>
        </tr>
      `;
    });

    let customerTable = document.getElementById("tblCustomers");
    customerTable.innerHTML=tableRow;
  });
}

loadCustomer();

async function searchCustomer(param){
  
  param = document.getElementById("searchCustomer").value;

  const searchResult = [];

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  let tableRow='';
  try {
    await Promise.all([
      searchByName(param, requestOptions, searchResult),
      searchByAddress(param, requestOptions, searchResult),
      searchById(param, requestOptions, searchResult)
    ]);

    searchResult.forEach(customer=>{
      if(customer.id){
        tableRow+=`
        <tr>
          <td>${customer.id}</td>
          <td>${customer.name}</td>
          <td>${customer.address}</td>
          <td>${customer.salary}</td>
        </tr>
      `;
      }
    })
    
  } catch (error) {
    console.log(error);
  }
    
  document.getElementById("searchCustomer").value ="";

  const searchResultContainer = document.getElementById("search-results");
  searchResultContainer.innerHTML=`
    <div class="container w-75">
      <h1 class="text-center text-light">Search Results</h1>
      <table class="table table-success">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Salary</th>
          </tr>
        </thead>
        <tbody>
          ${tableRow}   
        </tbody>
      </table>
      <div class="btn btn-warning my-2" onclick="closeSearchWindow()">close</div>
    </div>
  `;
  
}

async function searchById(param, requestOptions, searchResult) {
  try {
    const response = await fetch("http://localhost:8080/customer/search-by-id/" + param, requestOptions);
    const result = await response.json();
    
    if (result) {
      searchResult.push({
        id: result.id,
        name: result.name,
        address: result.address,
        salary: result.salary,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

async function searchByName(param, requestOptions, searchResult) {
  try {
    const response = await fetch("http://localhost:8080/customer/search-by-name/" + param, requestOptions);
    const result = await response.json();
    if (result){
      result.forEach(customer => {
        searchResult.push({
          id: customer.id,
          name: customer.name,
          address: customer.address,
          salary: customer.salary,
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
}

async function searchByAddress(param, requestOptions, searchResult) {
  try {
    const response = await fetch("http://localhost:8080/customer/search-by-address/" + param, requestOptions);
    const result = await response.json();

    if(result){
      result.forEach(customer => {
        searchResult.push({
          id: customer.id,
          name: customer.name,
          address: customer.address,
          salary: customer.salary,
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
}

function closeSearchWindow() {
  document.getElementById("search-results").innerHTML="";
}