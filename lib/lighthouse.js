// Lighthouse API
var xml2js = require('xml2js'),
    rest = require('restler'),
    url = require('url'),
    querystring = require('querystring'),
    builder = require('xmlbuilder');

function Lighthouse(email, password, location) {
  this.email = email;
  this.password = password;
  this.location = location;
}

Lighthouse.prototype.allProjects = function(callback) {
  var request = rest.get(
      url.resolve(this.location, 'projects.xml'), {
    username: this.email,
    password: this.password
  });
  request.on('success', function(data) {
    var projects = data.project;
    if (!projects.length) projects = [projects];
    callback(null, projects);
  });
  request.on('error', function(err) {
    callback(err, null);
  });
};

Lighthouse.prototype.allMembers = function(projectID, callback) {
  var request = rest.get(
      url.resolve(this.location, 'projects/' + projectID + '/memberships.xml'), {
    username: this.email,
    password: this.password
  });
  request.on('success', function(data) {
    var members = data.membership;
    if (!members.length) members = [members];
    callback(null, members);
  });
  request.on('error', function(error) {
    callback(error, null);
  });
};

Lighthouse.prototype.allMilestones = function(projectID, callback) {
  var request = rest.get(
      url.resolve(this.location, 'projects/' + projectID + '/milestones.xml'), {
    username: this.email,
    password: this.password
  });
  request.on('success', function(data) {
    var milestones = data.milestone;
    if (!milestones.length) milestones = [milestones];
    callback(null, milestones);
  });
  request.on('error', function(error) {
    callback(error, null);
  });
};

Lighthouse.prototype.allTicketBins = function(projectID, callback) {
  var request = rest.get(
      url.resolve(this.location, 'projects/' + projectID + '/bins.xml'), {
    username: this.email,
    password: this.password
  });
  request.on('success', function(data) {
    var ticketBins = data['ticket-bin'];
    if (!ticketBins.length) ticketBins = [ticketBins];
    callback(null, ticketBins);
  });
  request.on('error', function(error) {
    callback(error, null);
  });
};

Lighthouse.prototype.getTickets = function(projectID, query, callback) {
  var request = rest.get(
      url.resolve(this.location, 'projects/' + projectID + '/tickets.xml?' + (query !== null ? querystring.stringify({q: query}) : '')), {
    username: this.email,
    password: this.password
  });
  request.on('success', function(data) {
    var tickets = data.ticket;
    if (!tickets.length) tickets = [tickets];
    callback(null, tickets);
  });
  request.on('error', function(error) {
    callback(error, null);
  });
};

Lighthouse.prototype.createTicket = function(projectID, data, callback) {
  var request = rest.post(
      url.resolve(this.location, 'projects/' + projectID + '/tickets.xml'), {
    username: this.email,
    password: this.password,
    data: data
  });
  request.on('success', function(data) {
    callback(null, data);
  });
  request.on('error', function(error) {
    console.log(arguments);
    callback(error, null);
  });
};

Lighthouse.prototype.updateTicket = function(projectID, ticketNum, data, callback) {
  var request = rest.put(
      url.resolve(this.location, 'projects/' + projectID + '/tickets/' + ticketNum + '.xml'), {
    username: this.email,
    password: this.password,
    data: data
  });
  request.on('success', function(data) {
    callback(null, data);
  });
  request.on('error', function(error) {
    console.log(arguments);
    callback(error, null);
  });
};

module.exports = Lighthouse;
