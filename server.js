const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const ShortUrl = require("./models/shortUrl");
var x;

mongoose.connect("mongodb://localhost/urlshort", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  x=fetchlocation();
  setTimeout(updatedatabase, 300000);
  const shortUrls = await ShortUrl.find().sort({ _id: -1 });
  res.render("index", { xyz: shortUrls });
});

async function updatedatabase() {
  await ShortUrl.deleteMany({ asiaclicks: 0,europeclicks:0, africaclicks:0,northamericaclicks:0,
    southamericaclicks:0,australiaclicks:0, antarcticaclicks:0});
}

app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({
    full: req.body.fullUrl,
    short: req.body.shortUrl,
  });
  res.redirect("/");
});

app.post("/shortrandomUrls", async (req, res) => {
  await ShortUrl.create({
    full: req.body.fullUrl,
  });
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  if(x==="Asia")
  {shortUrl.asiaclicks++;}
  else if(x==Antarctica)
  {shortUrl.antarcticaclicks++;}
  else if(x==Australia)
  {shortUrl.australiaclicks++;}
  else if(x==NorthAmerica)
  {shortUrl.northamericaclicks++;}
  else if(x==SouthAmerica)
  {shortUrl.southamericaclicks++;}
  else if(x==Africa)
  {shortUrl.africaclicks++;}
  else if(x==Europe)
  {shortUrl.europeclicks++;}

  shortUrl.save();
  res.redirect(shortUrl.full);
});

function fetchlocation() {
  const https = require("https");
  https.get("https://api.db-ip.com/v2/free/self", (res) => {
      let data = "";

      // A chunk of data has been received.
    res.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
    res.on("end", () => {
        var json= (JSON.parse(data));
        x= json["continentName"];
        console.log(x);
        return x;
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port`, PORT);
});
