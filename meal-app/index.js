const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input");
console.log(input);

let meals = [];

const fetchMeals = async (search) => {
  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) => res.json())
    .then((data) => (meals = data.meals));
  console.log(meals);
};

function mealsDisplay() {
  if (meals === null) {
    result.innerHTML = "<h2>Aucun résultat</h2>";
  } else {
    meals.length = 12;
    result.innerHTML = meals
      .map(
        (meal) =>
          `
    <li class="card">
    <h2>${meal.strMeal}</h2>
    <p>${meal.strArea}</p>
    <img src=${meal.strMealThumb} alt="Photo ${meal.strMeal}">
    <ul></ul>
    </li>
    `
      )
      .join("");
  }
}

input.addEventListener("input", (e) => {
  fetchMeals(e.target.value).then(() => mealsDisplay());
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  mealsDisplay();
});
