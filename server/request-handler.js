
console.log("requiring server data in handler js");
var serverdata = require("./serverdata.js");
console.log("in handler js : required");
console.log("UserNames created at : "+serverdata.userNames.getCreated());
console.log("DbMsg created at : "+serverdata.dbMsg.getCreated());

var obj = serverdata.userNames;
console.log("get box in handler js : "+obj.getBox());  
console.log("set box to 'morning'");
obj.setBox("morning");
console.log("get box :"+obj.getBox());  


const express = require('express');
const router = express.Router();
// const pg = require('pg');
const path = require('path');
// const connection = 'postgres://localhost:5432/halpdesk';

// var client = new pg.Client(connection);
// client.connect();


exports.submitTicket = (req, res) => {
  console.log("calling submit ticker services");
  const results = [];
  const ticket = req.body;
  console.log(ticket);
  results.push({title:"fuck off"});
  res.json(results);
  // const query = client.query('INSERT INTO tickets(author, subject, issue, chatUrl, archive, status) values ($1, $2, $3, $4, $5, $6)', [ticket.author, ticket.subject, ticket.issue, ticket.chatUrl, ticket.archive, ticket.status]);
  // query.on('row', (row) => {
  //   results.push(row);
  // })
  // query.on('end', () => {
  //   return res.json(results);
  // });
};

exports.getOpenTickets = (req, res) => {
  const openTickets = [];
  // const query = client.query('SELECT * FROM tickets WHERE archive = false');
  // query.on('row', (row) => {
  //   openTickets.push(row);
  // });
  // query.on('end', () => {
  //   return res.json(openTickets);
  // });
};

exports.getArchivedTickets = (req, res) => {
  const archiveTickets = [];
  // const query = client.query('SELECT * FROM tickets WHERE archive = true');
  // query.on('row', (row) => {
  //   archiveTickets.push(row);
  // });
  // query.on('end', () => {
  //   return res.json(archiveTickets);
  // });
};

exports.updateTicket = (req, res) => {
  console.log(req.body);
  const results = [];
  const id = req.body.id;
  const ticket = Object.assign({}, req.body, { archive: !req.body.archive })
  // const query = client.query('UPDATE tickets SET archive = $1 WHERE id = $2', [ticket.archive, id]);
  // query.on('row', (row) => {
  //   results.push(row);
  // })
  // query.on('end', () => {
  //   return res.json(results);
  // });
};

exports.deleteTicket = (req, res) => {
  const results = [];
  // const query = client.query('DELETE FROM tickets WHERE tickets.id = $1', [req.body.id]);
  // query.on('row', (row) => {
  //   results.push(row);
  // })
  // query.on('end', () => {
  //   return res.json(results);
  // });
};


exports.getResponse = (req, res) => {
    var response = {response : "hello"}
    return res.json(response);
};


var globalA = "A";

exports.getDataServerA = (req, res) => {
    console.log("getting server data A");
    var temp = globalA;
    globalA = "B";
    return res.json(temp);
};

exports.getDataServerB = (req, res) => {
    console.log("getting server data B");
    var temp = globalA;
    globalA = "A";
    return res.json(temp);
};


var declic = require("./models/declic.js");

declic.createCalculator("josep",5);

//get all calculator in declic
exports.getCalculators = (req, res) => {
    console.log("getting all calculators from declic main instance");
    return res.json(declic.calculators);
};

//req = {"id":"123456"} GET
exports.getCalculator = (req, res) => {
    console.log("getting one calc by id");
    console.log(req.query);
    var id = req.query.id;
    console.log(JSON.stringify(declic.calculators[id]));
    return res.json(declic.calculators[id]);
};

//req = {"name":"name","nb_player":2}
exports.createCalculator = (req, res) => {
    console.log("client ask server to crate calculator");

    var param = req.body;
    var name = param.name;
    var nb = param.nb_player;
    console.log("name : "+name+";nb="+nb);
    var id = declic.createCalculator(name, nb);
    return res.json(req.body);
};

exports.saveCalculator = (req, res) => {
    console.log("client ask server to save calculator");
    var calculator = req.body;
    console.log("body received by server is : ");
    console.log(calculator);
    declic.saveCalculator(calculator);
    calculator.saved = true;
    return res.json(calculator);
};