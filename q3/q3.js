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
        var dataArray = data.split(/(?:<td>)|(?:<\/td>)|\s/);
        dataArray = dataArray.filter((entry) => entry !== '');
        const keyword = process.argv[2];
        const index = dataArray.indexOf(keyword)

        if (index >=0 && index < dataArray.length-1)
          console.log(dataArray[index+1])

        else console.log('NOT FOUND');
    });
});

request.on('error', (err) => {
    console.log("ERROR: ", err.message);
});

request.end();