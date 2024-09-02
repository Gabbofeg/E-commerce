const dbUrl = "https://striveschool-api.herokuapp.com/api/product/";
const dbKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNmNDk4YTAwOGQxMDAwMTVkZDNiNmUiLCJpYXQiOjE3MjQ4NjA4MTAsImV4cCI6MTcyNjA3MDQxMH0.F6e79uACX9WdmxHxyk8cyUokP2DS-lMkpdkk31hFao8";

const divShowProduct = document.getElementById("showProduct");
const containerPage = document.getElementById("verifyAuth");
const saveButton = document.getElementById("salva");

const deleteButton = document.createElement("button");
const editButton = document.createElement("a");

function toBold(value) {
  return "<span style='font-weight: bold;'>" + value + "</span>"
}

async function fillForm(p) {
  const url = new URLSearchParams(location.search);

  const id = url.get("id");
  const response = await fetch(dbUrl + id, {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
      Authorization: dbKey,
    },
  });
  const dati = await response.json();
  const nameParagraph = "<p id='name'>" + toBold("Name: ") + dati.name + "</p>";
  const brandParagraph = "<p style='width: 35vh'>" + toBold("Brand: ") + dati.brand + "</p>";
  const priceParagraph = "<p style='width: 35vh'>" + toBold("Price: ")+ dati.price + "</p>";
  const descriptionParagraph ="<p style='width: 35vh'>" + toBold("Description: ") + dati.description + "</p>";
  const urlPhoto ="<img style='width: 35vh' src="+ dati.imageUrl +"></img>";
  divShowProduct.innerHTML =
    "<div style='box-shadow: 5px 10px 5px #afb0b1; background-color: white; padding: 5px; border: 1px solid grey; border-radius: 20px' >" +
    urlPhoto +
    nameParagraph +
    brandParagraph +
    priceParagraph +
    descriptionParagraph +
    "</div>";
}

fillForm();

