// express
var express = require('express');
var app = express();

let message = "";

// /ok 
app.get('/ok', function(req, res) {
  console.log("an ok coming");
  message += " ok, I have done.";
  res.send('ok');
});

// /notok
app.get('/notok', function(req, res) {
  console.log("an not ok coming");
  message += " sorry, I failed.";
  res.send('not ok');
}
);

app.get("/receive", function(req, res) {
  console.log("receive");
  res.send(message || ".");
  message = "";
});

// start app
app.listen(3333, function() {
    console.log('App listening on port 3333');
}
);
