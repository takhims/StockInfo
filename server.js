const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
var socketClients  = require('./socketClient');
// console.log(socketClients);


// Environment variable file setup
require('dotenv').config()

const app = express()


//soket-io
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
	socketClients.push(socket);
	socket.broadcast.emit('hi');
	
	// socketClients.forEach((socket) => {
	// 	socket.emit('hello', { name: 'sudhanshu verma' })
	// });
	
	socket.on('disconnect', () => {
		console.log('before', socketClients.length);
		socketClients = socketClients.filter(({ id }) => id !== socket.id);
		// console.log('after', socketClients.length);
	})
});


const port = process.env.PORT || 8081

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

const connection = mongoose.connection
connection.once('open', () => {
	console.log('Mongoose Database Successfully connected!')
})

const stocksRouter = require('./routes/stocks')

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
  
	const path = require("path");
	app.get("*", (req, res) => {
	  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
  }

app.use(stocksRouter)

server.listen( port, () =>{
	
	console.log(`Server is running on port ${port}`)
})