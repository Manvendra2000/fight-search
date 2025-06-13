function formatDate(dateStr) {
  // Format from YYYY-MM-DD to DD-MM-YYYY
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}

function fetchFlights() {
  const startDateRaw = document.getElementById('departure').value;
  const endDateRaw = document.getElementById('returnDate').value;
  const travelClass = document.querySelector('input[name="trip-type-2"]:checked').value;

  const startDate = formatDate(startDateRaw);
  const endDate = formatDate(endDateRaw);

  // ✅ Use your own airport codes
  const origin = selectedFromCode;
  const destination = selectedToCode;

  const url = `http://localhost:8000/api/flights.php?origin=${origin}&destination=${destination}&class=${travelClass}&startDate=${startDate}&endDate=${endDate}`;

  fetch(url)
    .then((res) => res.json()) // <- parses directly to JSON
    .then((data) => {
      // Store in localStorage
      localStorage.setItem("flightSearchData", JSON.stringify(data));

      // Redirect to search1.html
      window.location.href = `search1.html?origin=${origin}&destination=${destination}&startDate=${startDate}&endDate=${endDate}&class=${travelClass}`;
    })
    .catch((error) => console.error(error));

}
function formatDate(yyyyMMdd) {
  const d = new Date(yyyyMMdd);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return dd + mm + yyyy;
}

function redirectWithParams() {
  const from = document.getElementById('from').value.trim().toUpperCase();
  const to = document.getElementById('to').value.trim().toUpperCase();
  const start = document.getElementById('start').value;
  const end = document.getElementById('end').value;
  const cls = document.getElementById('cls').value;

  const url = `search.html?origin=${from}&destination=${to}&startDate=${start}&endDate=${end}&class=${cls}`;
  window.location.href = url;
}