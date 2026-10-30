require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

// Configure Pug as the template engine
app.set('view engine', 'pug');

// Tell Express where the Pug templates are located
app.set('views', path.join(__dirname, 'views'));

// Fetch all countries from the REST Countries API
const fetchAllCountries = async () => {
  const limit = 100;
  let offset = 0;
  let countries = [];
  let more = true;

  while (more) {
    const response = await fetch(
      `https://api.restcountries.com/countries/v5?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.COUNTRY_API_KEY}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const result = await response.json();

    if (!result.data || !Array.isArray(result.data.objects) || !result.data.meta) {
      throw new Error('Unexpected API response structure');
    }

    countries = countries.concat(result.data.objects);

    more = result.data.meta.more;
    offset += limit;
  }

  return countries;
};
// Home route
app.get('/home', (req, res) => {
  res.render('home');
});

// Countries route
app.get('/countries', async (req, res) => {
  try {
    const countries = await fetchAllCountries();

    // Sort countries alphabetically by their common name
    countries.sort((countryA, countryB) => {
      const nameA = countryA.names?.common || '';
      const nameB = countryB.names?.common || '';

      return nameA.localeCompare(nameB);
    });

    res.render('countries', { countries });
  } catch (error) {
    console.error('Error fetching countries:', error.message);
    res.status(500).send('Unable to retrieve countries. Please try again later.');
  }
});

// Populous countries route
app.get('/populous', async (req, res) => {
  try {
    const countries = await fetchAllCountries();

    // Filter countries with a population of at least 50 million
    const populousCountries = countries.filter(
      (country) => Number.isFinite(country.population) && country.population >= 50000000,
    );

    // Sort countries from highest to lowest population
    populousCountries.sort((countryA, countryB) => countryB.population - countryA.population);

    res.render('populous', { populousCountries });
  } catch (error) {
    console.error('Error fetching populous countries:', error.message);
    res.status(500).send('Unable to retrieve populous countries. Please try again later.');
  }
});
// region route
app.get('/regions', async (req, res) => {
  try {
    const countries = await fetchAllCountries();

    // Group countries by region
    const regions = countries.reduce((regionGroups, country) => {
      const regionName = country.region || 'Not available';

      if (!regionGroups[regionName]) {
        regionGroups[regionName] = [];
      }

      regionGroups[regionName].push(
        country.names && country.names.common ? country.names.common : 'Name not available',
      );

      return regionGroups;
    }, {});

    res.render('regions', { regions });
  } catch (error) {
    console.error('Error fetching regions:', error.message);
    res.status(500).send('Unable to retrieve regions. Please try again later.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/home`);
});
