const countriesContainer = document.querySelector(".countries-container");
const btnSort = document.querySelectorAll(".btnSort");
console.log(btnSort);

let countriesData = [];
let sortMethod = "maxToMin";
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
      } else if (sortMethod === "alpha") {
        return a.name.common.localeCompare(b.name.common);
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

btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    countriesDisplay();
  });
});
