const express = require ('express')
const mongoose = require('mongoose')
const app=express()
const ShortUrl= require('./models/shortUrl')

mongoose.connect('mongodb://localhost/url', {
    useNewUrlParser: true,
    useUnifiedTopology:true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))

app.get('/', async (req,res)=> {
    const shortUrls = await ShortUrl.find().sort({_id: -1})
    res.render('index', {xyz: shortUrls})
    
})

app.post('/shortUrls', async (req,res) => {
    await ShortUrl.create({
        full: req.body.fullUrl,
        short: req.body.shortUrl})
    res.redirect('/')
})

app.post('/shortrandomUrls', async (req,res) => {
    await ShortUrl.create({
        full: req.body.fullUrl})
    res.redirect('/')
})

app.get('/:shortUrl', async (req,res) => {
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl})
    if(shortUrl==null) return res.sendStatus(404)
    
    shortUrl.clicks++
    shortUrl.save()
    res.redirect(shortUrl.full)
})

function fetchData(){
    console.log("hhdhek")
    if (window.navigator.geolocation) {
        window.navigator.geolocation
        .getCurrentPosition(console.log, console.log);
        console.log(bye)
    } 
    else console.log(hi)
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port`, PORT);
  });