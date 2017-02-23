#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');


var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    var pets = JSON.parse(data);
    var index = process.argv[3];

    if (index) {
      if (index >= pets.length || index < 0) {
        console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      }
      else {
        console.log(pets[index]);
      }
    } else {
      console.log(pets);
    }
  })
}
else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    var pets = JSON.parse(data);
    var age = process.argv[3];
    var kind = process.argv[4];
    var name = process.argv[5];



    if (age && kind && name) {
      var pet = {};
      pet.age = parseInt(age);
      pet.kind = kind;
      pet.name = name;
      pets.push(pet);
    } else {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      console.log(pet);
    })
  })
}
else if (cmd === 'update') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    var pets = JSON.parse(data);
    var index = process.argv[3];
    var age = process.argv[4];
    var kind = process.argv[5];
    var name = process.argv[6];

    if (index && age && kind && name) {
      pets[index].age = parseInt(age);
      pets[index].kind = kind;
      pets[index].name = name;
    }
    else{
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      console.log(pets[index]);
    })
  })
}
else if (cmd === 'destroy') {
  fs.readFile(petsPath, 'utf8', function(readErr, data){
    if (readErr) {
      throw readErr;
    }

    var pets = JSON.parse(data);
    var index = process.argv[3];
    var destroyed = pets[index];

    if (index) {
      pets.splice(index, 1);
    }
    else {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      console.log(destroyed);
    })

  })
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
