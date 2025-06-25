const countriesContainer = document.querySelector(".countries-container");
let countriesData = [];
let sortMethod = "minToMax";
const fetchCountries = async () => {
  await fetch(
    "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags"
  )
    .then((res) => res.json())
    .then((data) => (countriesData = data));
  console.log(countriesData);
  countriesDisplay();
};

const countriesDisplay = () => {
  countriesContainer.innerHTML = countriesData
    .filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        return a.population - b.population;
      }
    })
    .slice(0, inputRange.value)
    .map(
      (country) => `
<div class="card">
<img src = ${country.flags.svg} alt= "flag of ${country.name.common}">
<h2>${country.name.common}</h2>
<h4>${country.capital}</h4>
<p>Population : ${country.population.toLocaleString()}</p>
</div>
  `
    )
    .join("");
};

window.addEventListener("load", fetchCountries);
inputSearch.addEventListener("input", countriesDisplay);
inputRange.addEventListener("input", () => {
  countriesDisplay();
  rangeValue.textContent = inputRange.value;
});

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
