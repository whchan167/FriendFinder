// We are linking our routes to data source
// These data sources hold arrays of information on friends
var friendsData = require("../data/friends.js");

// API routing
module.exports = function(app) {
  // API GET Requests. Everytime when a user clicks the link, the event listener will route to the friends file 
  // which displays friends data

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // API POST Requests. When a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)

  app.post("/api/friends", function(req, res) {
  
      var scoreArray = [];
      var userscore = req.body.scores;
      var lowest = 0;
      
      //calculate the difference of scores by using user's score minus others' score 
      //and save in scoreArray
      for (var i=0; i<friendsData.length; i++){
            var otherscore = friendsData[i].scores;
            var totaldiff = 0;
          for (var j=0; j<userscore.length; j++){
             var sum = Math.abs(parseInt(userscore[j])- parseInt(otherscore[j]));
             totaldiff += sum;
          };
          scoreArray.push(totaldiff);
      };
      //find the lowest difference of friend scores and post this particular friend in html
      for (var i=0; i<scoreArray.length; i++){
          if (scoreArray[i]< scoreArray[lowest]){
            lowest = i;
          };   
      };
      res.json(friendsData[lowest]);
    });
};