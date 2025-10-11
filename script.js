const form = document.getElementById("time-form");
const list = document.getElementById("entries-list");
const chartCtx = document.getElementById("timeChart").getContext("2d");
const periodSelect = document.getElementById("period");
const exportBtn = document.getElementById("exportBtn");

let entries = JSON.parse(localStorage.getItem("entries")) || [];

// --- Met à jour la liste ---
function updateList() {
  list.innerHTML = "";

  if (entries.length === 0) {
    list.innerHTML = "<li>Aucune entrée pour l’instant</li>";
    return;
  }

  entries.forEach((entry, index) => {
    const li = document.createElement("li");
    li.classList.add("entry-item");
    li.innerHTML = `
      <span>${entry.date} — ${entry.category} : ${entry.hours} h</span>
      <button class="delete-btn" data-index="${index}">🗑️</button>
    `;
    list.appendChild(li);
  });

  // Boutons de suppression
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      deleteEntry(index);
    });
  });
}

// --- Supprime une entrée ---
function deleteEntry(index) {
  entries.splice(index, 1);
  localStorage.setItem("entries", JSON.stringify(entries));
  updateList();
  updateChart();
}

// --- Prépare les données du graphique ---
function prepareChartData() {
  let filteredEntries = [...entries];
  const period = periodSelect.value;
  const today = new Date();

  if (period === "week") {
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());
    filteredEntries = entries.filter((e) => new Date(e.date) >= firstDayOfWeek);
  } else if (period === "month") {
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    filteredEntries = entries.filter(
      (e) => new Date(e.date) >= firstDayOfMonth
    );
  }

  if (filteredEntries.length === 0) return { dates: [], datasets: [] };

  const dates = [...new Set(filteredEntries.map((e) => e.date))].sort();
  const categories = ["travail", "loisir", "sport", "projet perso", "autre"];
  const colors = ["#007bff", "#28a745", "#ffc107", "#ff5733", "#6c757d"];

  const datasets = categories.map((cat, i) => {
    const data = dates.map((date) =>
      filteredEntries
        .filter((e) => e.date === date && e.category === cat)
        .reduce((sum, e) => sum + e.hours, 0)
    );

    return {
      label: cat,
      data,
      borderColor: colors[i],
      backgroundColor: colors[i] + "33",
      borderWidth: 2,
      tension: 0.3,
      fill: false,
    };
  });

  return { dates, datasets };
}

// --- Met à jour le graphique ---
function updateChart() {
  const { dates, datasets } = prepareChartData();

  if (!dates || dates.length === 0) {
    if (window.timeChart && typeof window.timeChart.destroy === "function") {
      window.timeChart.destroy();
    }
    chartCtx.clearRect(0, 0, chartCtx.canvas.width, chartCtx.canvas.height);
    chartCtx.font = "16px Arial";
    chartCtx.fillText("Aucune donnée pour le moment.", 10, 50);
    return;
  }

  if (window.timeChart && typeof window.timeChart.destroy === "function") {
    window.timeChart.destroy();
  }

  window.timeChart = new Chart(chartCtx, {
    type: "line",
    data: { labels: dates, datasets: datasets },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: { display: true, text: "Évolution des heures par domaine" },
      },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: "Heures" } },
        x: { title: { display: true, text: "Date" } },
      },
    },
  });
}

// --- Ajout d’une entrée ---
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const category = document.getElementById("category").value;
  const hours = parseFloat(document.getElementById("hours").value);
  const date = document.getElementById("date").value;

  if (!date || isNaN(hours)) return;

  entries.push({ category, hours, date });
  localStorage.setItem("entries", JSON.stringify(entries));

  form.reset();
  updateList();
  updateChart();
});

// --- Filtre par période ---
periodSelect.addEventListener("change", updateChart);

// --- Export des données ---
exportBtn.addEventListener("click", () => {
  const dataStr = JSON.stringify(entries, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `suivi_temps_${new Date().toISOString().split("T")[0]}.json`;
  a.click();

  URL.revokeObjectURL(url);
});

// --- Initialisation ---
updateList();
updateChart();
