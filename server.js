const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
  const formData = req.body;

  fs.readFile('data.json', (err, data) => {
    const json = data.length ? JSON.parse(data) : [];
    json.push(formData);

    fs.writeFile('data.json', JSON.stringify(json, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error saving data');
      } else {
        res.status(200).send('Data saved successfully');
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
