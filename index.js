// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp microservice endpoint
app.get("/api/:date?", function (req, res) {
  let dateInput = req.params.date;
  let date;

  // If no date input provided, use current time
  if (!dateInput) {
    date = new Date();
  } else {
    // Try parsing the date input
    if (/^\d+$/.test(dateInput)) {
      // If input is a Unix timestamp
      date = new Date(parseInt(dateInput));
    } else {
      // If input is a date string
      date = new Date(dateInput);
    }
  }

  // Check if the date is valid
  if (isNaN(date)) {
    // Invalid date
    res.json({ error: "Invalid Date" });
  } else {
    // Valid date
    res.json({ 
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
