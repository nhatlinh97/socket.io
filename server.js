"use strict";
const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.Server(app);
const io = require('socket.io')(httpServer);
const SocketIOFile = require('socket.io-file');

app.get('/', (req, res, next) => {
	return res.sendFile(__dirname + '/client/index.html');
});

app.get('/app.js', (req, res, next) => {
	return res.sendFile(__dirname + '/client/app.js');
});

app.get('/socket.io.js', (req, res, next) => {
	return res.sendFile(__dirname + '/node_modules/socket.io-client/dist/socket.io.js');
});

app.get('/socket.io-file-client.js', (req, res, next) => {
	return res.sendFile(__dirname + '/node_modules/socket.io-file-client/socket.io-file-client.js');
});

io.on('connection', function (socket) {
  var parts = [];

io.on('data', function (data) {
     if (data[1] === undefined) {
         fs.writeFile(parts.join(''), callback);
     } else {
         parts[data[0]] = data[1];
         socket.emit('received');
     }
  });
	console.log('Socket connected.');

	var count = 0;
	var uploader = new SocketIOFile(socket, {
		uploadDir: 'data',
		chunkSize: 10240,
		transmissionDelay: 0,
		overwrite: false, 							
	});
	uploader.on('start', (fileInfo) => {
		console.log('Start uploading');
		console.log(fileInfo);
	});
	uploader.on('stream', (fileInfo) => {
		console.log(`${fileInfo.wrote} / ${fileInfo.size} byte(s)`);
	});
	uploader.on('complete', (fileInfo) => {
		console.log('Upload Complete.');
		console.log(fileInfo);
	});
	uploader.on('error', (err) => {
		console.log('Error!', err);
	});
	uploader.on('abort', (fileInfo) => {
		console.log('Aborted: ', fileInfo);
	});
});

httpServer.listen(3000, () => {
	console.log('Server listening on port 3000');
});
