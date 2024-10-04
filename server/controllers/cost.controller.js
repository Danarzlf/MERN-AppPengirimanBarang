const request = require('request');

// Existing getCost function
exports.getCost = (req, res) => {
  const { origin, destination, weight, courier } = req.body;

  const options = {
    method: 'POST',
    url: 'https://api.rajaongkir.com/starter/cost',
    headers: { 
      key: '97abc39a23f8bc621f160c54e87ddea6', 
      'content-type': 'application/x-www-form-urlencoded'
    },
    form: { origin, destination, weight, courier }
  };

  request(options, function (error, response, body) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(JSON.parse(body));
  });
};

// New getCity function
exports.getCity = (req, res) => {
  const { id, province } = req.query;

  const options = {
    method: 'GET',
    url: `https://api.rajaongkir.com/starter/city`,
    headers: { key: '97abc39a23f8bc621f160c54e87ddea6' }
  };

  request(options, function (error, response, body) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(JSON.parse(body));
  });
};


// New getCity function
exports.getProvince = (req, res) => {
  const { id, province } = req.query;

  const options = {
    method: 'GET',
    url: `https://api.rajaongkir.com/starter/province`,
    headers: { key: '97abc39a23f8bc621f160c54e87ddea6' }
  };

  request(options, function (error, response, body) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(JSON.parse(body));
  });
};
