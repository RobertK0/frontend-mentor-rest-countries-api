"use strict";

const cardsContainer = document.querySelector(".card-container");
const searchBar = document.querySelector(".search-bar");
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
<div class="card">
  <img class="flag" src="${country.flag}" alt="" />
  <div class="text-container">
    <h2>${country.name}</h2>
    <div class="text">
      <span><strong>Population:</strong> ${country.population}</span>
    </div>
    <div class="text">
      <span><strong>Region:</strong> ${country.region}</span>
    </div>
    <div class="text">
      <span><strong>Capital:</strong> ${country.capital}</span>
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

fetchCountries();

searchBar.addEventListener("keyup", filterResults);
