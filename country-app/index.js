let countriesData = [];
const fetchCountries = async () => {
  await fetch(
    "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags"
  )
    .then((res) => res.json())
    .then((data) => (countriesData = data));
  console.log(countriesData);
};
window.addEventListener("load", fetchCountries);

// 3 - Passer les données à une variable

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
