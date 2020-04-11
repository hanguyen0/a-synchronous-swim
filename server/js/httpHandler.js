const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = () => { }) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  console.log('req._postData: ', req._postData)
  if (req.method === 'GET') {
    if (fs.existsSync(req._postData)) {
      res.writeHead(200, headers);
    } else if ((req._postData == 'up') || (req._postData == 'down') || (req._postData == 'left') || (req._postData == 'right')) {
      res.writeHead(200, headers);
      res.write(req._postData);
    } else {
      res.writeHead(404, headers);
    }
  }
  else if (req.method === 'OPTIONS') {
    res.write();
    res.writeHead(200, headers);
  }

  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
