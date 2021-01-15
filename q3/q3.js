var https = require('https');
var options = {
  host: 'codequiz.azurewebsites.net',
  path: '/',
  headers: {
    "content-type": "application/json",
    "cookie": "hasCookie=true"
  }
};

var request = https.get(options, (response) => {
    var data = '';
    response.on('data', (content) => {
        data += content;
    });
    response.on('end', ()=> {
        const slicedData = data.split('<td>');
        console.log()
    });
});

request.on('error', (err) => {
    console.log("ERROR: ", err.message);
});

request.end();