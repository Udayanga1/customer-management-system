function addCustomer(){
  const name = document.getElementById("txtName").value;
  const address = document.getElementById("txtAddress").value;
  const salary = document.getElementById("txtSalary").value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "name": name,
    "address": address,
    "salary": salary
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw
  };

  fetch("http://localhost:8080/customer/add", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

  document.getElementById("txtName").value = "";
  document.getElementById("txtAddress").value = "";
  document.getElementById("txtSalary").value = "";
}
