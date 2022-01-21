const https = require('https');
const fs = require('fs');
const app = require('./app');
require('dotenv').config()

////////// Version HTTPS /////////////////


// Https SLL KEY AND CERTS //
let sslOptions = {
  key: fs.readFileSync(process.env.SSLKEY),
  cert: fs.readFileSync(process.env.SSLCERT)
};

// Normalisation port
const normalizePortHttps = val => {
  const portHttps = parseInt(val, 10);

  if (isNaN(portHttps)) {
    return val;
  }
  if (portHttps >= 0) {
    return portHttps;
  }
  return false;
};

//Déclaration du port
const portHttps = normalizePortHttps(process.env.PORTHTTPS || '3001');
app.set('port', portHttps);


// Errors Management
const errorHandlerHttps = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const addressHttps = serverHttps.address();
  const bindHttps = typeof addressHttps  === 'string' ? 'pipe ' + addressHttps : 'port: ' + portHttps;
  switch (error.code) {
    case 'EACCES':
      console.error(bindHttps + ' requires elevated privileges.');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bindHttps + ' is already in use.');
      process.exit(1);
    default:
      throw error;
  }
};

// Create serverHttps 
const serverHttps = https.createServer(sslOptions, app);

serverHttps.on('error', errorHandlerHttps);
serverHttps.on('listening', () => {
  const addressHttps = serverHttps.address();
  const bindHttps = typeof address === 'string' ? 'pipe ' + addressHttps : 'port ' + portHttps;
  console.log('HTTPS Listening on ' + bindHttps);
});

serverHttps.listen(portHttps);
