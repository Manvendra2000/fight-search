const puppeteer = require('puppeteer');

async function scrapeIxigo(origin, destination, date) {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--disable-features=Geolocation',
      '--blink-settings=imagesEnabled=false' // Improve performance
    ]
  });
  const page = await browser.newPage();
  const url = `https://www.ixigo.com/search/result/flight/${origin}/${destination}/${date}/1/0/0/e`;

  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.setGeolocation({ latitude: 0, longitude: 0 });
await page.browserContext().overridePermissions('https://www.ixigo.com', []);
  await new Promise(resolve => setTimeout(resolve, 5000));
  // Update: Wait for a real, reliable selector
  await page.waitForSelector('[data-testid="pricing"]');

  const flights = await page.evaluate(() => {
    const data = [];
    const cards = document.querySelectorAll('[data-testid="pricing"]');

    cards.forEach(priceEl => {
      const card = priceEl.closest('.px-20');
      if (!card) return;

      const getText = (sel, base = card) => base.querySelector(sel)?.innerText || '';

      const airline = card.querySelector('[data-testid="airline-logo"]')?.alt || '';
      const flightNumber = getText('p.body-sm');
      const timeEls = card.querySelectorAll('.timeTileList');
      const dep = getText('h6', timeEls[0]);
      const arr = getText('h6', timeEls[1]);
      const duration = getText('.text-center > p.body-sm');
      const price = priceEl?.innerText || '';

      const baggage = card.innerText.includes('Check-in :') ? 'Baggage info available' : 'No baggage info found';

      data.push({ airline, flightNumber, dep, arr, duration, price, baggage });
    });

    return data;
  });

  await browser.close();
  return flights;
}

module.exports = scrapeIxigo; 