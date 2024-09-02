const dbUrl = "https://striveschool-api.herokuapp.com/api/product/";
const dbKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNmNDk4YTAwOGQxMDAwMTVkZDNiNmUiLCJpYXQiOjE3MjQ4NjA4MTAsImV4cCI6MTcyNjA3MDQxMH0.F6e79uACX9WdmxHxyk8cyUokP2DS-lMkpdkk31hFao8";

const price = document.getElementById("price");
const brand = document.getElementById("brand");
const description = document.getElementById("description");
const name = document.getElementById("name");
const inputForm = document.getElementById("inputForm");
const deleteButton = document.createElement("button");
const editButton = document.createElement("a");
// const imageUrl = document.getElementById("imageUrl");

deleteButton.classList.add("btn", "btn-danger");
editButton.classList.add("btn", "btn-warning");

async function viewProduct() {
  const url = new URLSearchParams(location.search);

  const id = url.get("id");
  if (id) {
    const response = await fetch(dbUrl + id, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Authorization: dbKey,
      },
    });
    const dati = await response.json();

    price.value = dati.price;
    brand.value = dati.brand;
    description.value = dati.description;
    name.value = dati.name;
  }
}

viewProduct();

inputForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const editObject = {
    name: name.value,
    brand: brand.value,
    price: Number(price.value),
    description: description.value,
  };

  const url = new URLSearchParams(location.search);
  const id = url.get("id");
  try {
    const response = fetch(dbUrl + id, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        Authorization: dbKey,
      },
      body: JSON.stringify(editObject),
    });
    if (response.ok) {
      window.location.href = `?id=${id}`;
    }
  } catch (error) {
    console.error("Errore:", error);
  }
});
