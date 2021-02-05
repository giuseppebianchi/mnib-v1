var express = require('express');
var router = express.Router();

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
 
var fs = require('fs');
var data = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
//console.log(data)


var tweets;
var params = {screen_name: data.twitter_username, count: 10};
client.get('statuses/user_timeline', params, function(error, data, response){
  if (!error) {
  	tweets = data;
    //console.log(tweets[0].entities.media);
  }else{
		console.log('why5?');
	}
});

var twitterProfile;
client.get('users/show.json',{user_id: '165499545', screen_name: data.twitter_username}, function(error, data, response){
	if(!error){
		twitterProfile = data;
	}else{
		console.log('why6?');
	}
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Giuseppe Bianchi - Home',
    image_page: req.headers.host + "/img/code.jpg",
  	twitterimage: twitterProfile.profile_image_url,
  	profileimage: twitterProfile.profile_image_url.replace('_normal', ''),
  	twitterBio:  twitterProfile.description,
  	location: twitterProfile.location,
  	tweets: tweets,
    Twitter: data.social.twitter,
    Instagram: data.social.instagram,
    Linkedin: data.social.linkedin,
    Github: data.social.github,
    Codepen: data.social.codepen,
    Google: data.social.google,
    Vimeo: data.social.vimeo,
    cv: data.docs.cv_url,
    resume: data.docs.resume_url
  });
});

module.exports = router;
