const canvas = document.getElementById("art");
const ctx = canvas.getContext("2d");

const getMousePos = (e) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
};

const mouseMove = (e) => {
  const mousePos = getMousePos(e);
  ctx.lineTo(mousePos.x, mousePos.y);
  ctx.stroke();
  ctx.strokeStyle = "salmon";
  ctx.lineWidth = 10;
};

canvas.addEventListener("mousedown", (e) => {
  e.preventDefault();
  const mousePos = getMousePos(e);
  ctx.beginPath();
  ctx.moveTo(mousePos.x, mousePos.y);

  canvas.addEventListener("mousemove", mouseMove);
  canvas.addEventListener("mouseup", () => {
    canvas.removeEventListener("mousemove", mouseMove);
  });
});

reset.addEventListener("click", () => {
  ctx.clearRect(0, 0, 800, canvas.width, canvas.height);
});
