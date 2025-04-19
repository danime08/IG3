document.addEventListener('DOMContentLoaded', () => {
    fetchGlobalData();
    fetchScotlandData();
    fetchTopCountriesData();
  });
  
  // Fetch global COVID-19 data
  function fetchGlobalData() {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        document.getElementById('cases').textContent = data.cases.toLocaleString();
        document.getElementById('deaths').textContent = data.deaths.toLocaleString();
        document.getElementById('recovered').textContent = data.recovered.toLocaleString();
        createBarChart('globalChart', data, 'Global');
      })
      .catch(error => console.error('Error fetching global data:', error));
  }
  
  // Fetch Scotland-specific COVID-19 data
  function fetchScotlandData() {
    fetch('https://disease.sh/v3/covid-19/countries/UK')
      .then(response => response.json())
      .then(data => {
        document.getElementById('cases-scotland').textContent = data.cases.toLocaleString();
        document.getElementById('deaths-scotland').textContent = data.deaths.toLocaleString();
        document.getElementById('recovered-scotland').textContent = data.recovered.toLocaleString();
        createBarChart('scotlandChart', data, 'Scotland');
      })
      .catch(error => console.error('Error fetching Scotland data:', error));
  }
  
  // Fetch top 10 countries and display in table
  function fetchTopCountriesData() {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById("data-table-body");
        data.sort((a, b) => b.cases - a.cases); // Sort by case count
        data.slice(0, 10).forEach(country => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${country.country}</td>
            <td>${country.cases.toLocaleString()}</td>
            <td>${country.deaths.toLocaleString()}</td>
            <td>${country.recovered.toLocaleString()}</td>
          `;
          tableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error("Error fetching country data:", error);
      });
  }
  
  // Reusable bar chart function
  function createBarChart(canvasId, data, regionName) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Cases', 'Deaths', 'Recovered'],
        datasets: [{
          label: `COVID-19 Stats (${regionName})`,
          data: [data.cases, data.deaths, data.recovered],
          backgroundColor: ['#007bff', '#dc3545', '#28a745'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: `COVID-19 Overview for ${regionName}`
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  