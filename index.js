//Settinf Up Variables
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;
// Get Total
function gettingTotal() {
  if (price.value !== "") {
    let result = `${
      Number(price.value) +
      Number(taxes.value) +
      Number(ads.value) -
      Number(discount.value)
    }`;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "rgb(185, 15, 66)";
  }
}

// Create Product

let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    newPro.title != "" &&
    newPro.price != "" &&
    newPro.taxes != "" &&
    newPro.ads != "" &&
    newPro.discount != "" &&
    newPro.category != "" &&
    newPro.count < 101
  ) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      count.style.display = "block";
      submit.innerHTML = "Create";
      mood = "create";
    }
    clearInputs();
  }

  localStorage.setItem("product", JSON.stringify(dataPro));

  createItem();
};

// Clear Inputs

function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// Read

function createItem() {
  gettingTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateItem(${i})" id="update">update</button></td>
    <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
  </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = table;

  let deleteallBtn = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    deleteallBtn.innerHTML = `
    <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
    `;
  } else {
    deleteallBtn.innerHTML = ``;
  }
}
createItem();

// Delete Item
function deleteItem(id) {
  dataPro.splice(id, 1);
  localStorage.product = JSON.stringify(dataPro);
  createItem();
}

// Delete All

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  createItem();
}

// Update

function updateItem(id) {
  title.value = dataPro[id].title;
  price.value = dataPro[id].price;
  taxes.value = dataPro[id].taxes;
  ads.value = dataPro[id].ads;
  discount.value = dataPro[id].discount;
  gettingTotal();
  count.style.display = "none";
  category.value = dataPro[id].category;
  mood = "update";
  submit.innerHTML = "Update";
  tmp = id;

  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// Search

let searchMood = "Title";
let search = document.getElementById("search");

function getSearchMood(id) {
  if (id === "searchByTitle") {
    searchMood = "Title";
  } else {
    searchMood = "Category";
  }
  search.placeholder = `Search By ${searchMood}`;
  search.focus();
  search.value = "";
  createItem();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood === "Title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
    <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateItem(${i})" id="update">update</button></td>
    <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
  </tr>
    `;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
     <tr>
     <td>${i}</td>
     <td>${dataPro[i].title}</td>
     <td>${dataPro[i].price}</td>
     <td>${dataPro[i].taxes}</td>
     <td>${dataPro[i].ads}</td>
     <td>${dataPro[i].discount}</td>
     <td>${dataPro[i].total}</td>
     <td>${dataPro[i].category}</td>
     <td><button onclick="updateItem(${i})" id="update">update</button></td>
     <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
   </tr>
     `;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
