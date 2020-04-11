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
  console.log('Serving request type: ' + req.method + ', url: ' + req.url + ', data: ' + req._postData);

  // const data = new Uint8Array(Buffer.from('req._postData'));
  // if ((req.method === 'POST') && (req.url === '/background')) {
  //   console.log("Posting");
  //   fs.writeFile(module.exports.backgroundImageFile, req._postData, (err) => {
  //     if (err) {
  //       console.log("Err: ", err);
  //       res.writeHead(404, headers);
  //     } else {
  //       console.log("successss BG saved");
  //       res.writeHead(201, headers);
  //     }

  //   });
  // }

  // if (req.method === 'GET') {
  //   if (req.url === '/background') {
  //     if (fs.existsSync(req._postData)) {
  //       res.writeHead(200, headers);
  //       res.write(module.exports.backgroundImageFile);
  //     }
  //     // } else if ((req._postData == 'up') || (req._postData == 'down') || (req._postData == 'left') || (req._postData == 'right')) {
  //   } else {
  //     res.write('up');
  //     res.writeHead(200, headers);
  //     // res.write(req._postData);
  //     // } else {
  //     //   res.writeHead(404, headers);
  //   }
  // }

  if (req.method === 'GET') {
    // res.write(messageQueue.toString());
    res.writeHead(200, headers);
    res.end(messageQueue);
    messageQueue = null;
  }

  else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }


  next(); // invoke next() at the end of a request to help with testing!
};
