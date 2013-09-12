var request = require('request'),
    jsdom = require('jsdom');
    var url = process.argv[2]

request({ uri: url }, function (error, response, body) {
  if (error && response.statusCode !== 200) {
    console.log('Error when contacting the given reddit page.... you did give a reddit post as a URL right?... RIGHT?!?!?!... okay i\'ll calm down...');
  }
  
  jsdom.env({
    html: body,
    scripts: [
      'http://code.jquery.com/jquery-1.5.min.js'
    ], 
    done: function (err, window) {
      var $ = window.jQuery;
      var comments = $(".entry");
      var winner = comments.eq(Math.floor(Math.random()*comments.length)); // fetch the random winner
      var winner_name = $(winner).find(".author").text();
       // jQuery is now loaded on the jsdom window created from 'agent.body'
       console.log("And the winner is.... " + winner_name + "!");
    }
  });
});