"use strict";

const cardsContainer = document.querySelector(".card-container");
const searchBar = document.querySelector(".search-bar");
const regionSelector = document.querySelector(".region-selector");
const modal = document.querySelector(".modal-container");
const modalContent = document.querySelector(".modal-content");
const backBtn = document.querySelector(".back-btn");
const themeBtn = document.querySelector(".theme-toggle-btn");

let cleanDataArr = [];
const fetchCountries = async function () {
  try {
    const response = await fetch("https://restcountries.com/v2/all");
    const data = await response.json();

    data.forEach((element) => {
      const cleanData = {
        name: element.name,
        nativeName: element.nativeName,
        topLevelDomain: element.topLevelDomain,
        population: element.population,
        currencies: element.currencies,
        region: element.region,
        languages: element.languages,
        subregion: element.subregion,
        capital: element.capital,
        borders: element.borders,
        flag: element.flag,
      };
      cleanDataArr.push(cleanData);
    });
    console.log(cleanDataArr);
    renderCountries(cleanDataArr);
  } catch (error) {
    console.error(error);
  }
};

const generateMarkup = function (country) {
  return `
<div class="card" data-name="${country.name}">
  <img class="flag" src="${country.flag}" alt="" />
  <div class="text-container">
    <h2>${country.name}</h2>
    <div class="text">
      <strong>Population:</strong> <span>${country.population}</span>
    </div>
    <div class="text">
      <strong>Region:</strong> <span>${country.region}</span>
    </div>
    <div class="text">
      <strong>Capital:</strong> <span>${country.capital}</span>
    </div>
  </div>
</div>
`;
};

const generateModalMarkup = function (country) {
  return `
<div class="country-container-modal">
  <img class="flag-modal" src="${country.flag}" alt="" />
  <div class="text-container-modal">
    <h2>${country.name}</h2>
    <div class="text">
      <strong>Native Name:</strong> <span>${country.nativeName}</span>
    </div>
    <div class="text">
      <strong>Population:</strong> <span>${country.population}</span>
    </div>
    <div class="text">
      <strong>Region:</strong> <span>${country.region}</span>
    </div>
    <div class="text">
      <strong>Subregion:</strong> <span>${country.subregion}</span>
    </div>
    <div class="text">
      <strong>Capital:</strong> <span>${country.capital}</span>
    </div>
    <div class="text">
      <strong>Top Level Domain:</strong> <span>${country.topLevelDomain}</span>
    </div>
    <div class="text">
      <strong>Currencies:</strong> <span>${country.currencies
        .map((language) => language.name)
        .join(",")}</span>
    </div>
    <div class="text">
      <strong>Languages:</strong> <span>${country.languages
        .map((language) => language.name)
        .join(",")}</span>
    </div>
  </div>
</div>
`;
};

const renderCountries = function (countries) {
  cardsContainer.innerHTML = "";
  countries.forEach((country) =>
    cardsContainer.insertAdjacentHTML("beforeend", generateMarkup(country))
  );
};

const filterResults = function (e) {
  console.log(e.target.value);
  const countriesFiltered = cleanDataArr.filter((country) =>
    country.name.toLowerCase().includes(e.target.value.toLowerCase())
  );

  console.log(countriesFiltered);
  renderCountries(countriesFiltered);
};

const filterRegion = function (e) {
  console.log(e.target.value);
  const countriesFiltered = cleanDataArr.filter((country) =>
    country.region.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountries(countriesFiltered);
};

const getCountry = function (e) {
  const card = e.target.closest(".card");
  if (!card) return;
  const countryObject = cleanDataArr.filter(
    (country) => country.name === card.dataset.name
  );
  renderModal(countryObject[0]);
};

const toggleModal = function () {
  modal.classList.toggle("hidden");
  document.documentElement.classList.toggle("scroll-lock");
};

const renderModal = function (country) {
  console.log(country);
  toggleModal();
  modalContent.innerHTML = generateModalMarkup(country);
};

let lightThemeBool = true;

const toggleTheme = function () {
  let color1, color2, colorText;
  if (lightThemeBool) {
    color1 = "hsl(207, 26%, 17%)";
    color2 = "hsl(209, 23%, 22%)";
    colorText = "hsl(0, 0%, 100%)";
    lightThemeBool = !lightThemeBool;
  } else {
    color1 = "hsl(0, 0%, 98%)";
    color2 = "hsl(0, 0%, 100%)";
    colorText = "hsl(200, 15%, 8%)";
    lightThemeBool = !lightThemeBool;
  }
  document.querySelector(":root").style.setProperty("--main-bg", color1);
  document.querySelector(":root").style.setProperty("--element", color2);
  document.querySelector(":root").style.setProperty("--text", colorText);
};

fetchCountries();

searchBar.addEventListener("keyup", filterResults);
regionSelector.addEventListener("change", filterRegion);
cardsContainer.addEventListener("click", getCountry);
backBtn.addEventListener("click", toggleModal);
themeBtn.addEventListener("click", toggleTheme);
