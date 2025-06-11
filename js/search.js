window.addEventListener('DOMContentLoaded', () => {
    const rawData = localStorage.getItem('flightResults');
    if (!rawData) {
      document.getElementById('output').textContent = 'No data found.';
      return;
    }
  
    const data = JSON.parse(rawData);
    const results = data?.data?.going?.results || [];
    const container = document.getElementById('output');
    container.innerHTML = '';
  
    if (!results.length) {
      container.textContent = 'No flights found.';
      return;
    }
  
    results.forEach(flight => {
      const card = document.createElement('div');
      card.style = `
        padding: 16px;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-family: sans-serif;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        margin-bottom: 1rem;
      `;
      card.innerHTML = `
        <strong>${flight.airline} (${flight.airlineCode})</strong><br>
        Flight No: ${flight.flightNumber || 'N/A'}<br>
        Date: ${flight.date}<br>
        Price: ₹${flight.fare.toLocaleString()}<br>
      `;
      container.appendChild(card);
    });
  
    // Optionally clear it after showing
    // localStorage.removeItem('flightResults');
  });