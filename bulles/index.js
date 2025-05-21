const counterDispley = document.querySelector("h3");
let counter = 0;

const repeatBubble = () => {
  const bubble = document.createElement("span");
  document.body.appendChild(bubble);
  bubble.classList.add("bubble");
  const size = Math.random() * 200 + 100 + "px";
  bubble.style.height = size;
  bubble.style.width = size;

  bubble.style.top = Math.random() * 100 + 50 + "%";
  bubble.style.left = Math.random() * 100 + "%";
  const plusOrMinus = Math.random > 0.5 ? -1 : 1;
  bubble.style.setProperty("--left", Math.random() * 100 * plusOrMinus + "%");

  setTimeout(() => {
    bubble.remove();
  }, 8000);
  bubble.addEventListener("click", () => {
    counter++;
    counterDispley.textContent = counter;

    bubble.remove();
  });
};
setInterval(repeatBubble, 1000);
