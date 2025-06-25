const countriesContainer = document.querySelector(".countries-container");
let countriesData = [];
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

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
