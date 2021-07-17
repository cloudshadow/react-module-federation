#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app';
import debugLib from 'debug';
import http from 'http';
import mongoose from 'mongoose';

const debug = debugLib('cloud-mongo:server');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
connect();

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

function connect() {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', onListening);
  //var uri = 'mongodb://172.16.9.241/replSetTest,mongodb://172.16.9.240/replSetTest,mongodb://172.16.9.84/replSetTest';
  // return mongoose.connect('mongodb://cloudshadow:Dominos1215@localhost/store_scheduling?authSource=admin', { keepAlive: 1, useNewUrlParser: true });
  return mongoose.connect('mongodb://localhost/cloud_mongo', { keepAlive: 1, useNewUrlParser: true });
  // return mongoose.connect('mongodb://cloudshadow:Dominos1215@localhost/cloud_mongo?authSource=admin', { keepAlive: 1, useNewUrlParser: true });
}