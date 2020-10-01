const express = require('express')
const app = express()

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.set('view engine', 'ejs');
app.set('views','./views')
app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/register', (req,res)=>{
    res.render('register')
})
app.listen(2000,(err)=>{
    try{
        console.info('server running')
    } catch {
        console.error(err)
    }
})