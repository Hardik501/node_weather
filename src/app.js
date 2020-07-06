const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')
const app = express()
const PublicDirPath = path.join(__dirname, '../public')
const ViewPath = path.join(__dirname, '../templates/views')
const Partials = path.join(__dirname, '../templates/partials')


app.use(express.static(PublicDirPath))
const port =3000
hbs.registerPartials(Partials)
//set view engine as hbs
app.set('view engine','hbs')
app.set('views', ViewPath)

app.get('', (req, res)=>{
    res.render('index',{
        name:'hardik',
        title:'Weather App',
        creator:'hardik barvaliya'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About',
        name:'hardik',
        creator:'hardik barvaliya'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title:'Help',
        name:'Hardik',
        creator:'hardik barvaliya'
    })
})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must pass address'
        })
    }
    geocode(req.query.address, (error, response) => {
        if (error) {
            return res.send({error})
        }
        forecast(response, (error, body) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast:body.consolidated_weather[0].weather_state_name,
                temperature:parseFloat(body.consolidated_weather[0].the_temp).toFixed(2),
                address:req.query.address,
            })
        })
    })
    
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'Oops!!!',
        type:'404 Help Article Not Found',
        creator:'Hardik Barvaliya'
    })
})
app.get('*', (req, res)=>{
    res.render('404',{
        title:'Oops!!!',
        type:'404 Page Not Found',
        creator:'Hardik Barvaliya'
    })
})
app.listen(port,()=>{console.log(`The app is running on localhost:${port}`)})