var express    = require('express');        // call express
var app        = express();                 // define our app using express
var port = process.env.PORT || 8080;        // set our port
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('frontend'));
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'Unearthed Hackathons -> Challenge API' });
});

app.use('/api', router);

app.listen(port);
console.log('Unearthed Message: Webserver working on port ' + port);

