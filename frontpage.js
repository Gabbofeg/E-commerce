const url = "https://striveschool-api.herokuapp.com/api/product/";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNmNDk4YTAwOGQxMDAwMTVkZDNiNmUiLCJpYXQiOjE3MjQ4NjA4MTAsImV4cCI6MTcyNjA3MDQxMH0.F6e79uACX9WdmxHxyk8cyUokP2DS-lMkpdkk31hFao8";

// async function postProduct(product) {
//   const requestOption = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: key,
//     },
//     method: "POST",
//     body: JSON.stringify(product),
//   };
//   fetch(url, requestOption);
// }

// async function getProduct() {
//   var response = await fetch(url, {
//     headers: {
//       Authorization: key,
//     },
//   });
//   var json = await response.json();
//   return json;
// }

// async function showProduct() {
//   const resultProduct = await getProduct();
//   var li = `<tr><th>Name</th><th>Description</th><th>Brand</th><th>Price</th></tr>`;
//   resultProduct.forEach((product) => {
//     li += `<tr><td>${product.name}</td><td>${product.description}</td><td>${product.brand}</td><td>${product.price}</td></tr>`;
//   });
//   document.getElementById("product").innerHTML = li;
// }

// showProduct();

// async function createProduct() {
//     const product = {
//     name: "productName",
//     price: 45.99,
//     description: "afvdddbdbdd",
//     brand: "abibas",
//     imageUrl: "url",
//     };
//     document.getElementById("loader").innerHTML = `<div class="wrap"> Caricamento... </div>`
//     await postProduct(product);
//     document.getElementById("loader").innerHTML = ""
//     setTimeout(() => {
//       document.location = document.location;
//     }, 1500);
// }

// submitButton.addEventListener(`click`, function(){
//   document.getElementById("productName").innerHTML = ""
//   document.getElementById("productDescription").innerHTML = ""
//   document.getElementById("productBrand").innerHTML = ""
//   document.getElementById("productName").innerHTML = ""
// })

async function call(product) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: key,
    },
    body: JSON.stringify(product),
  });
  const products = await response.json();
  const target = document.getElementById("target");

  products.forEach((product) => {
    const col = document.createElement("div");
    const card = document.createElement("div");
    const cardBody = document.createElement("div");
    const title = document.createElement("h5");
    const description = document.createElement("p");
    const a = document.createElement("a");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("a");

    col.classList.add("col-4");
    card.classList.add("card", "myCard");
    cardBody.classList.add("card-body");
    title.classList.add("card-title");
    a.classList.add("btn", "btn-primary");
    deleteButton.classList.add("btn", "btn-danger");
    editButton.classList.add("btn", "btn-warning");
    description.classList.add("description");

    title.textContent = product.name;
    description.textContent = product.description;
    a.innerText = "Visualizza";
    a.href = "dettaglio.html?id=" + product._id;
    deleteButton.innerText = "Elimina";
    editButton.href = "editProduct.html?id=" + product._id;
    editButton.innerText = "Modifica";
    cardBody.append(title, description, a);
    card.append(cardBody);
    col.append(card);
    target.append(col);

    deleteButton.addEventListener("click", function () {
      const conf = confirm("Sei sicuro di voler eliminare l elemento?");
      if (conf) {
        fetch(url + product._id, {
          method: "DELETE",
          headers: {
            "Content-Type": "Application/json",
            Authorization: key,
          },
        })
          .then((res) => res.json())
          .then(() => {
            col.remove();
          });
      }
    });

    // cardBody.append(title,p,a,editButton,deleteButton)
    // card.append(cardBody)
    // col.append(card)
    // target.append(col)
  });
}

call();
