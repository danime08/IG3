// Bar Chart: Global Cases (Top 10 Countries)
fetch("https://disease.sh/v3/covid-19/countries")
  .then(res => res.json())
  .then(data => {
    const topCountries = data
      .sort((a, b) => b.cases - a.cases)
      .slice(0, 10);

    const countries = topCountries.map(c => c.country);
    const cases = topCountries.map(c => c.cases);

    new Chart(document.getElementById("barChart"), {
      type: "bar",
      data: {
        labels: countries,
        datasets: [{
          label: "Total Cases",
          data: cases,
          backgroundColor: "rgba(255, 99, 132, 0.6)"
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });

// Line Chart: UK Historical Data
fetch("https://disease.sh/v3/covid-19/historical/UK?lastdays=30")
  .then(res => res.json())
  .then(data => {
    const timeline = data.timeline.cases;
    const dates = Object.keys(timeline);
    const values = Object.values(timeline);

    new Chart(document.getElementById("lineChart"), {
      type: "line",
      data: {
        labels: dates,
        datasets: [{
          label: "UK Cases (Last 30 Days)",
          data: values,
          borderColor: "blue",
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });
