const today = new Date().toISOString().split("T")[0];
start_date.value = today;
start_date.min = today;

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

let tommorowFormat = tomorrow.toISOString().split("T")[0];
end_date.value = tommorowFormat;
end_date.min = tommorowFormat;

start_date.addEventListener("change", (e) => {
  let day = new Date(e.target.value);
  if (end_date.value < start_date.value) {
    day.setDate(day.getDate() + 1);
    end_date.value = day.toISOString().split("T")[0];
  }
});

end_date.addEventListener("change", (e) => {
  let day = new Date(e.target.value);
  if (end_date.value < start_date.value) {
    day.setDate(day.getDate() - 1);
    start_date.value = day.toISOString().split("T")[0];
  }
});

const bookingCalc = () => {
  let diffTime = Math.abs(
    new Date(end_date.value) - new Date(start_date.value)
  );
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffDays);
  total.textContent = nightPrice.textContent * diffDays;
};

start_date.addEventListener("change", bookingCalc);
end_date.addEventListener("change", bookingCalc);

bookingCalc();
