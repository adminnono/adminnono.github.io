const form = document.querySelector("form");
const list = document.getElementById("list");

const storeList = () => {
  window.localStorage.listStorage = list.innerHTML;
};

const getList = () => {
  if (window.localStorage.listStorage) {
    list.innerHTML = window.localStorage.listStorage;
  } else {
    list.innerHTML = `<li>Cliquer sur un Todo pour le supprimer</li>`;
  }
};
window.addEventListener("load", getList);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  list.innerHTML += `<li>${item.value}</li>`;
  item.value = "";
  storeList();
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("checked")) {
    e.target.remove();
  } else {
    e.target.classList.add("checked");
  }
  storeList();
});
