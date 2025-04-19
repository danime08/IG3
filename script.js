fetch("https://disease.sh/v3/covid-19/countries")
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById("data-table-body");

    // Sort countries by total case count (descending)
    data.sort((a, b) => b.cases - a.cases);

    // Show top 10
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
    console.error("Error fetching data:", error);
  });
