const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const { hotels } = require('./hotels.js');

const app = express();
const port = 3010;

app.use(cors());

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
  // console.log(hotels);
});

app.get('/hotels/sort/pricing', (req, res) => {
  let pricing = req.query.pricing;
  let hotelsArr;
  if (pricing === 'low-to-high') {
    hotelsArr = hotels.slice().sort((a, b) => a.price - b.price);
  } else if (pricing === 'high-to-low') {
    hotelsArr = hotels.slice().sort((a, b) => b.price - a.price);
  }
  // console.log(hotelsArr);
  res.json({ hotels: hotelsArr });
});

app.get('/hotels/sort/rating', (req, res) => {
  let rating = req.query.rating;
  let hotelsArr;
  if (rating === 'low-to-high') {
    hotelsArr = hotels.slice().sort((a, b) => a.rating - b.rating);
  } else if (rating === 'high-to-low') {
    hotelsArr = hotels.slice().sort((a, b) => b.rating - a.rating);
  }
  res.json({ hotels: hotelsArr });
});

app.get('/hotels/sort/reviews', (req, res) => {
  let reviews = req.query.reviews;
  let hotelsArr;
  if (reviews === 'least-to-most') {
    hotelsArr = hotels.slice().sort((a, b) => a.reviews - b.reviews);
  } else if (reviews === 'most-to-least') {
    hotelsArr = hotels.slice().sort((a, b) => b.reviews - a.reviews);
  }
  // console.log(hotelsArr);
  res.json({ hotels: hotelsArr });
});

app.get('/hotels/filter/amenity', (req, res) => {
  let amenity = `${req.query.amenity}`.toLowerCase();
  let hotelsArr = hotels.filter((x) => x.amenity.toLowerCase() === amenity);
  res.json({ hotels: hotelsArr });
});

app.get('/hotels/filter/country', (req, res) => {
  let country = `${req.query.country}`.toLowerCase();
  let hotelsArr = hotels.filter((x) => x.country.toLowerCase() === country);
  res.json({ hotels: hotelsArr });
});

app.get('/hotels/filter/category', (req, res) => {
  let category = `${req.query.category}`.toLowerCase();
  let hotelsArr = hotels.filter((x) => x.category.toLowerCase() === category);
  res.json({ hotels: hotelsArr });
});

app.get('/hotels', (req, res) => {
  res.json({ hotels: hotels });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
