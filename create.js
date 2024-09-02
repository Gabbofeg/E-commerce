const url = "https://striveschool-api.herokuapp.com/api/product/";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNmNDk4YTAwOGQxMDAwMTVkZDNiNmUiLCJpYXQiOjE3MjQ4NjA4MTAsImV4cCI6MTcyNjA3MDQxMH0.F6e79uACX9WdmxHxyk8cyUokP2DS-lMkpdkk31hFao8";

const createButton = document.getElementById("crea");
const form = document.getElementById("form");

createButton.addEventListener("click", (e) => {
  e.preventDefault();

  async function call() {
    const price = document.getElementById("price").value;
    const brand = document.getElementById("brand").value;
    const description = document.getElementById("description").value;
    const name = document.getElementById("name").value;
    const imageUrl = document.getElementById("imageUrl").value;

    const prodotto = {
      name: name,
      brand: brand,
      price: Number(price),
      description: description,
      imageUrl: imageUrl,
    };
    console.log(JSON.stringify(prodotto));

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: key,
      },
      body: JSON.stringify(prodotto),
    })
      .then((response) => {
        response.json(prodotto);
      })
      .then(alert("Prodotto creato con successo"));
  }
  call();
});

async function viewProduct() {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: key,
    },
  });
  const products = await response.json();
  const target = document.getElementById("pinuccio");

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
    cardBody.append(title, description, editButton, deleteButton);
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

viewProduct();
