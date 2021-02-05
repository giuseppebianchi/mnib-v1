var express = require('express');
var router = express.Router();
 
var fs = require('fs');
var data = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
//console.log(data)

var getProject = function(id){
  var p = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
  return (p.projects.filter(function(item) {
    if(item.url_name == id){
      return item;
    }
  }))[0];
}

/* GET all projects. */
router.get('/', function(req, res, next) {
  res.render('projects', { 
    title: 'Giuseppe Bianchi - Projects',
    image_page: req.headers.host + '/img/projects.jpg',
    Projects: data.projects
  });
});

/* GET project page. */
router.get('/:id', function(req, res, next) {
  var project = getProject(req.params.id)
  res.render('single_project', { 
    title: 'Giuseppe Bianchi - Projects - ' + project.name,
    page_description: project.subtitle,
    image_page: req.headers.host + project.img,
    item: project,
    html: fs.readFileSync(project.html_body, 'utf8')
  });
});



module.exports = router;
