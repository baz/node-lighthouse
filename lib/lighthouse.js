// Lighthouse API
var xml2js = require('xml2js'),
    rest = require('restler'),
    url = require('url'),
    querystring = require('querystring'),
    builder = require('xmlbuilder');

function Lighthouse() { }

Lighthouse.prototype.authenticate = function(email, password, location, callback) {
  // Fetch projects to confirm credentials are accurate
  this.allProjects(email, password, location, callback);
};

Lighthouse.prototype.allProjects = function(email, password, location, callback) {
  var request = rest.get(url.resolve(location, 'projects.xml'), {
    username: email,
    password: password});
  request.on('success', function(data) {
    var projects = data.project;
    if (!projects.length) projects = [projects];
    callback(null, projects);
  });
  request.on('error', function(data) {
    callback('Authentication credentials were incorrect.', null);
  });
};

Lighthouse.prototype.allMembers = function(projectID, email, password, location, callback) {
  var request = rest.get(url.resolve(location, 'projects/' + projectID + '/memberships.xml'), {
    username: email,
    password: password});
  request.on('success', function(data) {
    var members = data.membership;
    if (!members.length) members = [members];
    callback(null, members);
  });
  request.on('error', function(data) {
    callback(error, null);
  });
};

Lighthouse.prototype.allMilestones = function(projectID, email, password, location, callback) {
  var request = rest.get(url.resolve(location, 'projects/' + projectID + '/milestones.xml'), {
    username: email,
    password: password});
  request.on('success', function(data) {
    var milestones = data.milestone;
    if (!milestones.length) milestones = [milestones];
    callback(null, milestones);
  });
  request.on('error', function(data) {
    callback(error, null);
  });
};

Lighthouse.prototype.allTicketBins = function(projectID, email, password, location, callback) {
  var request = rest.get(url.resolve(location, 'projects/' + projectID + '/bins.xml'), {
    username: email,
    password: password});
  request.on('success', function(data) {
    var ticketBins = data['ticket-bin'];
    if (!ticketBins.length) ticketBins = [ticketBins];
    callback(null, ticketBins);
  });
  request.on('error', function(data) {
    callback(error, null);
  });
};

Lighthouse.prototype.tickets = function(projectID, query, email, password, location, callback) {
  var request = rest.get(url.resolve(location, 'projects/' + projectID + '/tickets.xml?' + (query !== null ? querystring.stringify({q: query}) : '')), {
    username: email,
    password: password});
  request.on('success', function(data) {
    var tickets = data.ticket;
    if (!tickets.length) tickets = [tickets];
    callback(null, tickets);
  });
  request.on('error', function(data) {
    callback(error, null);
  });
};

module.exports = Lighthouse;
