var restify = require('restify');
let dbConn = require('./config/db-connection')();
dbConn.query(`show tables`, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to database!")
    }
})




//RESTIFY SERVER CONFIG AND SETUP


const corsMiddleware = require('restify-cors-middleware');
const cors = corsMiddleware({ // an array of origins
    allowHeaders: [
        'x-access-token','Access-Control-Allow-Origin','X-XSS-Protection','X-Frame-Options','X-Content-Type-Options','Content-Security-Policy'
    ]
});


var server = restify.createServer();
server.pre(cors.preflight);
server.use(cors.actual);


// Change timeout for response
server.server.setTimeout(60000 * 25);




server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

// Add Security Headers
server.use((req, res, next) => {
    res.header("X-Content-Type-Options", "nosniff");
    res.header("X-XSS-Protection", "1; mode=block");
    next()

})

//Auth
require('./controllers/auth')(server);

server.get('/*', restify.plugins.serveStatic({
    directory: './static',
    default: 'index.html'
}));


//Actions
require('./controllers/patch-install-job-alert/actions')(server);


/////////// Remove this when locally:
const ENDPOINT = "/cea-ui";
server.pre((req, res, next) => {
    req.url = req.url.replace(ENDPOINT, "")
    server.useChain.run(req, res, next);
})
////////////


server.listen(3005, function() {
    console.log(`${server.name} listening at ${server.url}`);
})