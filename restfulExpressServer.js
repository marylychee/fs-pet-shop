'use strict'

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var express = require('express');
var app = express();
var port = process.env.PORT  || 8000;

var morgan = require('morgan');
var bodyParser = require('body-parser');

app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json())

app.get('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var pets = JSON.parse(petsJSON);

    res.send(pets);
  });
});

app.post('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    var pets = JSON.parse(petsJSON);

    var pet = {};
    pet.age = req.body.age;
    pet.kind = req.body.kind;
    pet.name = req.body.name;

    if (!pet || !req.body.age || !req.body.kind || !req.body.name) {
      return res.sendStatus(400);
    }

    pets.push(pet);

    var newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'application/json');
      res.send(pet);
    });
  });
});

app.get('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }


    res.set('Content-Type', 'application/json');
    res.send(pets[id]);
  });
});

app.patch('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    var petAge = req.body.age;
    var petKind = req.body.kind;
    var petName = req.body.name;

    if (!petAge && !petKind && !petName) {
        return res.sendStatus(400);
    }

    var updatedPet = pets[id];

    if (petAge) {
      updatedPet.age = req.body.age;
    }
    if (petKind) {
      updatedPet.kind = req.body.kind;
    }
    if (petName) {
      updatedPet.name = req.body.name;
    }

    var newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'application/json');
      res.send(updatedPet);
    });
  });
});

app.delete('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(petsJSON);
    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    var deletedPet = pets[id];
    pets.splice(id, 1);

    var newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'application/json');
      res.send(deletedPet);
    });
  })
})

app.use(function(req, res){
  res.sendStatus(404);
})

app.listen(port, function() {
  console.log('Listening on post ', port);
});


module.exports = app;
