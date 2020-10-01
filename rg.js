const express = require('express');
const bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator');
//funkcja check jako parametr przyjmuje string z nazwa pola do sprawdzenia
const app = express();
//Przetworzona treść żądania zostanie ustawiona jako wartość req.body
const options = {
    inflate: true,
    limit:100,
    extended: true,
    parametrLimit: 1
}
const urlencodeParser = bodyParser.urlencoded(options)

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.set('view engine', 'ejs');
app.set('views','./views');
app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/register', (req,res)=>{
    res.render('register');
});
app.post('/register', urlencodeParser,[
    check('username','Nazwa musi zawierac min 3 znanki').exists().isLength({min:3}),
    check('email','Email nie jest prawidlowy.').isEmail().normalizeEmail(),
    check('password','Haslo').exists().isLength({min:3,max:10})
],(req,res)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){
    //return res.status(422).jsonp(errors.array())
    const alert = errors.array()
    res.render('register',{
        alert
    })
}

});
app.listen(2000,(err)=>{
    try{
        console.info('server running....')
    } catch {
        console.error(err)
    }
})
