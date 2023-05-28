//-------------- Import Plugin ----------------------//
// Basic Request Handler Plugin
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Business Logics Plugin
const auth = require('./src/auth')
const article = require('./src/article');
const profile = require('./src/profile');

//-------------- Routers ----------------------//
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

app.get('/', function(req,res){
    res.send({ hello: 'world' })
});

auth(app);
article(app);
profile(app);


//----------- Running Configuration ----------------//

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
     const addr = server.address();
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
});