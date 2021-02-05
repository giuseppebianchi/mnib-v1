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

var getStory = function(id){
  var s = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
  return (p.stories.filter(function(item) {
    if(item.url_name == id){
      return item;
    }
  }))[0];
}

var tweets;
var params = {screen_name: 'mynameisbianchi', count: 10};
client.get('statuses/user_timeline', params, function(error, data, response){
  if (!error) {
  	tweets = data;
    //console.log(tweets[0]);
  }else{
		console.log('why3?');
	}
});

var twitterProfile;
client.get('users/show.json',{user_id: '165499545', screen_name: data.twitter_username}, function(error, data, response){
	if(!error){
		twitterProfile = data;
		//console.log(data)
	}else{
		console.log('why4?');
	}
});
 

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('about', { 
  	title: 'Giuseppe Bianchi - About Me',
    image_page: req.headers.host + "/img/aboutme.jpg",
  	twitterimage: twitterProfile.profile_image_url,
  	profileimage: twitterProfile.profile_image_url.replace('_normal', ''),
  	twitterBio:  twitterProfile.description,
  	location: twitterProfile.location,
  	tweets: tweets,
  	biography: data.bio,
  	Twitter: data.social.twitter,
  	Instagram: data.social.instagram,
  	Linkedin: data.social.linkedin,
  	Github: data.social.github,
  	Codepen: data.social.codepen,
  	Google: data.social.google,
  	Vimeo: data.social.vimeo,
  	Education: data.education,
  	Work: data.work,
    resume: data.docs.resume_url,
    cv: data.docs.cv_url,
    soundcloud: '<iframe width="100%" height="300" style="margin: 40px 0 60px;" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/248839525&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>'
  });
});

/* GET storehouse page. */
router.get('/stories', function(req, res, next) {
  res.render('stories', { 
    title: 'Giuseppe Bianchi - Stories',
    image_page: req.headers.host + '/img/sf2.jpg',
    Stories: data.stories
  });
});

/* GET storehouse page. */
router.get('/stories/:id', function(req, res, next) {
  res.render('story', { 
    title: 'Giuseppe Bianchi - ',
    image_page: req.headers.host + '/img/sf2.jpg'
  });
});

/* GET old storehouse stories page. */
router.get('/storehouse', function(req, res, next) {
  res.render('storehouse', {
    title: 'Giuseppe Bianchi - Storehouse',
    image_page: req.headers.host + '/img/aboutme.jpg',
  });
});




module.exports = router;
