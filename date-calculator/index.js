const today = new Date().toISOString().split("T")[0];
start_date.value = today;
start_date.min = today;

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

let tomorrowFormat = tomorrow.toISOString().split("T")[0];
console.log(tomorrowFormat);

end_date.value = tomorrowFormat;
end_date.min = tomorrowFormat;
