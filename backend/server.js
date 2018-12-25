// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');
const Telegraf = require('telegraf');
var Agent = require('socks5-https-client/lib/Agent');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const agent = new Agent({
  socksHost: 'proxy.telecom.pw', // Defaults to 'localhost'.
		socksPort: 50150, // Defaults to 1080.
		// Optional credentials
		socksUsername: 'pubg',
		socksPassword: 'ObamaFan2k1$',
});
const botToken = "707601685:AAGUctm0x_nmTfInJTr6sQpQGQG9LptvI3M";
const botOptions = {
  telegram: {
    agent: agent
  }
}
const channelId = -1001272127509;
const bot = new Telegraf(botToken, botOptions);
bot.startPolling();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// init sqlite db
var fs = require('fs');
var dbFile = './sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function(){
  if (!exists) {
    db.run('CREATE TABLE Schedule (date TEXT, time TEXT, isSelected INTEGER DEFAULT 0,  UNIQUE(date, time) ON CONFLICT IGNORE)');
    console.log('New table Schedule created!');
    // insert default dreams
    db.serialize(function() {
    });
  }
  else {
    console.log('Database "Schedule" ready to go!');
  }
});

const selectByDate = "SELECT time, isSelected FROM Schedule WHERE date = ? ";
app.get('/time/:dt', (req, res) => {
  if (!req.params.dt) return res.send([]);
  db.all(selectByDate, req.params.dt ,(err, rows) => {
    if (err) return res.sendStatus(500);
    return res.send(JSON.stringify(rows));
  })
  console.log(req.params);
});

const selectAllByDate = "SELECT * FROM Schedule where date = ?";
const deleteAllByDate = "DELETE FROM Schedule where date = ? and isSelected=0"
app.post('/time/add', (req, res) => {
  // if (!req.body.data.length && req.body.date) return res.sendStatus(200);
  const date = req.body.date;
  db.all(selectAllByDate, [date], (err, data) => {
    if (err) return res.sendStatus(500);
    var inDb = data.map(el => el.time);
    
    var sorted = inDb.length ? _.union(req.body.data, _.intersection(req.body.data, inDb)) : req.body.data;

    db.run(deleteAllByDate, [date], (err) => {
      if (err) return res.sendStatus(500);
      const stmt = db.prepare("INSERT INTO Schedule (date, time) VALUES (?, ?)");
      sorted.map(item => {
        stmt.run(date, item);
      });
      stmt.finalize();
      return res.sendStatus(200);
    });
    
  });  
});
const updateByDate = "UPDATE Schedule set isSelected=1 where date=? and time=?";
app.post('/time/select', (req, res) => {
  if (!req.body.data && req.body.date) return res.sendStatus(422);
  const {data, date, who, phone} = req.body;
  let stmt = db.prepare(updateByDate);
  stmt.run(date, data);
  bot.telegram.sendMessage(channelId, `${date}, ${data}, ${who}: ${phone}`);
})

// http://expressjs.com/en/starter/basic-routing.html
app.get('*', function(request, response) {
  response.sendFile(__dirname + '/public/views/index.html');
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3100, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
