
var friends = require('../app/data/friends.js');
var match;
var score = 0;
var compatability = 100;

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var userInput = req.body;

        for (i in friends) {
            for (var n = 0; n < 10; n++) {
                score += Math.abs(friends[i].scores[n] - userInput.scores[n]);
            }
            if (score < compatability) {
                compatability = score;
                match = friends[i];
                score = 0;
            }
            score = 0;
        }
        friends.push(userInput);
        compatability = 100;
        res.json(match);
    });
};