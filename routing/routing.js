// variables


// required files
handleIndexGetRequest = require('./handleIndexGetRequest');
handleJoinGetRequest = require('./handleJoinGetRequest');
generateHtmlForGameGetRequest = require('./../generateHtml/generateHtmlForGameGetRequest');


// functions
function setupRouting(app) {

  app.get('/', function(req, res) {
    handleIndexGetRequest(req, res);
  });

  app.get('/join', function(req, res) {
    handleJoinGetRequest(req, res);
  });

  app.get('/game', function(req, res) {
    userId = req.query.id;
    html = generateHtmlForGameGetRequest(userId);
    res.send(html);
  });

}




module.exports = setupRouting;