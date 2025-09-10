const items = [];

document.getElementById("item-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const weight = parseFloat(document.getElementById("weight").value);
  const value = parseFloat(document.getElementById("value").value);
  items.push({ name, weight, value });
  updateTable();
  this.reset();
});

function updateTable() {
  const tbody = document.querySelector("#item-table tbody");
  tbody.innerHTML = "";
  items.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.weight}</td>
        <td>${item.value}</td>
        `;
    tbody.appendChild(row);
  });
}

function runAlgorithm() {
  const capacity = parseFloat(document.getElementById("capacity").value);
  let remaining = capacity;
  const sorted = [...items].sort(
    (a, b) => b.value / b.weight - a.value / a.weight
  );
  console.log(sorted);
  const viewport = document.getElementById("viewport");
  viewport.innerHTML = "";

  let y = 0;
  let totalValue = 0;

  sorted.forEach((item, index) => {
    if (remaining < 0) return;
    const takeWeight = Math.min(item.weight, remaining);
    const fraction = takeWeight / item.weight;
    const takenValue = item.value * fraction;

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", 10);
    rect.setAttribute("y", y);
    rect.setAttribute("width", (takenValue / capacity) * 500);
    rect.setAttribute("height", 30);
    rect.setAttribute("fill", fraction < 1 ? "#88f" : "#4caf50");
    rect.setAttribute("class", 'bar');

    const label = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    label.setAttribute("x", 15);
    label.setAttribute("y", y + 20);
    label.textContent = `${item.name} (${(fraction * 100).toFixed(0)}%)`;

    viewport.appendChild(rect);
    viewport.appendChild(label);

    remaining -= takeWeight;
    totalValue += takenValue;
    y += 40;
  });

  document.getElementById(
    "summary"
  ).textContent = `Total value: ${totalValue.toFixed(2)} | Total weight: ${(
    capacity - remaining
  ).toFixed(2)}`;
}
