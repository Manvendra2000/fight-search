function fetchFlights() {

  const from = document.getElementById('fromInput').value.trim();
  const to = document.getElementById('toInput').value.trim();
  const departure = document.getElementById('departure').value;
  const returnDate = document.getElementById('returnDate').value;
  const warningDiv = document.getElementById('warningMessage');

  let missingFields = [];

  if (!from) missingFields.push('From location');
  if (!to) missingFields.push('To location');
  if (!departure) missingFields.push('Departure date');
  if (!returnDate) missingFields.push('Return date');

  if (missingFields.length > 0) {
    warningDiv.style.display = 'block';
    warningDiv.innerText = `Please fill out: ${missingFields.join(', ')}`;
    return;
  }

  warningDiv.style.display = 'none';
    const startDateRaw = document.getElementById('departure').value;
    const endDateRaw = document.getElementById('returnDate').value;
    const travelClass = document.querySelector('input[name="trip-type-2"]:checked').value;
  
    const origin = selectedFromCode;
    const destination = selectedToCode;
  
    const startDate = formatDate(startDateRaw);
    const endDate = formatDate(endDateRaw);
  
    const url = `http://localhost:8000/api/flights.php?origin=${origin}&destination=${destination}&class=${travelClass}&startDate=${startDate}&endDate=${endDate}`;
  
    fetch(url)
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('flightResults', JSON.stringify(data)); // ✅ store in localStorage
  
        // ✅ redirect with params
        const redirectUrl = `search1.html?origin=${origin}&destination=${destination}&startDate=${startDateRaw}&endDate=${endDateRaw}&class=${travelClass}`;
        window.location.href = redirectUrl;
      });
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