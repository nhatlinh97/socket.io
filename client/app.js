var socket = io('http://localhost:3000');
var uploader = new SocketIOFileClient(socket);
var form = document.getElementById('form');

uploader.on('ready', function() {
	console.log('SocketIOFile ready to go!');
});
uploader.on('start', function(fileInfo) {
	console.log('Start uploading', fileInfo);
});
uploader.on('stream', function(fileInfo) {
	console.log('Streaming... sent ' + fileInfo.sent + ' bytes.');
});
uploader.on('complete', function(fileInfo) {
	console.log('Upload Complete', fileInfo);
});
uploader.on('error', function(err) {
	console.log('Error!', err);
});
uploader.on('abort', function(fileInfo) {
	console.log('Aborted: ', fileInfo);
});

form.onsubmit = function(ev) {
	ev.preventDefault();
	var chunk_size = 100;
var compressed_data = 'some-long-string';
var reg = new RegExp('/.{1,'+chunk_size+'}/g');
var parts = compressed_data .match(reg);
var l = parts.length -1;

client.socket.emit('data', parts.pop());

client.socket.on('received', function () {
    client.socket.emit('data', [l - parts.lengt, parts.pop()]);
});

	var fileEl = document.getElementById('file');


	var uploadIds = uploader.upload(fileEl.files);
};
