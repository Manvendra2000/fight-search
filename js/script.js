function fetchFlights() {
  // Gather parameters
  const startDate = document.getElementById('departure').value;
  const endDate = document.getElementById('returnDate').value;
  const travelClass = document.querySelector('input[name="trip-type-2"]:checked').value;

  // Use your own airport codes
  const origin = selectedFromCode;
  const destination = selectedToCode;

  // Correct API URL (keep dates in YYYY-MM-DD format)
  const url = `https://ajdui8.in/api/flight-offer-search.php?origin=${origin}&destination=${destination}&class=${travelClass}&startDate=${startDate}&endDate=${endDate}`;

  fetch(url)
    .then((res) => res.json()) // parses directly to JSON
    .then((data) => {
      // Store in localStorage
      localStorage.setItem("flightSearchData", JSON.stringify(data));

      // Redirect to search1.html
      window.location.href = `search1.html?origin=${origin}&destination=${destination}&startDate=${startDate}&endDate=${endDate}&class=${travelClass}`;
    })
    .catch((error) => console.error(error));

}

function redirectWithParams() {
  const from = document.getElementById('from').value.trim().toUpperCase();
  const to = document.getElementById('to').value.trim().toUpperCase();
  const start = document.getElementById('start').value;
  const end = document.getElementById('end').value;
  const cls = document.getElementById('cls').value;

  // Keep dates in YYYY-MM-DD format
  const url = `search1.html?origin=${from}&destination=${to}&startDate=${start}&endDate=${end}&class=${cls}`;
  window.location.href = url;
}