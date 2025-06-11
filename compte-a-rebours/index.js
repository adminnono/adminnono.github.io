let totalSeconds;

const countDown = () => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  countdownDisplay.textContent = `${minutes} : ${seconds}`;
  console.log(minutes, seconds);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (isNaN(choice.value)) {
    alert("Je vais me facher");
  } else {
    totalSeconds = choice.value * 60;
    choice.value = "";
  }
  setInterval(countDown, 1000);
});
