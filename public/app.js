async function loadCharts() {

  const response = await fetch("/api/charts");

  const data = await response.json();

  Plotly.newPlot(
    "Chart 1",
    [
      {
        x: data.sales.labels,
        y: data.sales.values,
        type: "bar",
        marker: {
          color: "royalblue",
        },
      },
    ],
    {
      title: "Sales by Month",
      responsive: true,
    },
  );

  Plotly.newPlot(
    "Chart 2",
    [
      {
        x: data.visits.labels,
        y: data.visits.values,
        type: "bar",
        marker: {
          color: "seagreen",
        },
      },
    ],
    {
      title: "Visits by Page",
      responsive: true,
    },
  );

  Plotly.newPlot(
    "Chart 3",
    [
      {
        x: data.productivity.labels,
        y: data.productivity.values,
        type: "bar",
        marker: {
          color: "crimson",
        },
      },
    ],
    {
      title: "Team Productivity",
      responsive: true,
    },
  );
}

loadCharts();

window.addEventListener("resize", () => {
  Plotly.Plots.resize("Chart 1");
  Plotly.Plots.resize("Chart 2");
  Plotly.Plots.resize("Chart 3");
});
