
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var hello = require('./routes/hello');
var discussion = require('./routes/discussion');


var chat = require('./routes/chat');
var cors = require('cors');

var WebSocketServer = require('websocket').server;


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/user/:username', user.index);

app.post('/discussion/:message', discussion.create);
app.get('/discussion/latest/:items', discussion.read);


app.get('/start', cors(), chat.start);
app.post('/send/:message', cors(), chat.send);


var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
}); 