import express from 'express';
import path from 'path';
// import Server from 'socket.io';

// const io = new Server();

const router = express.Router();


// http://localhost:3000/
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname+'/../view/index.html'));
});

// io.on('connection', function(socket){
//   console.log('a user connected');
// });

module.exports = router;
