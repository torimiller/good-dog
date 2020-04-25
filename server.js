const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// both runServer and closeServer need to access the same
// server object, so we declare `server` here, and then when
// runServer runs, it assigns a value.
// let server;

// // this function starts our server and returns a Promise.
// // In our test code, we need a way of asynchronously starting
// // our server, since we'll be dealing with promises there.
// function runServer() {
//   const port = process.env.PORT || 8080;
//   return new Promise((resolve, reject) => {
//     server = app
//       .listen(port, () => {
//         console.log(`Your app is listening on port ${port}`);
//         resolve(server);
//       })
//       .on("error", err => {
//         reject(err);
//       });
//   });
// }

// // like `runServer`, this function also needs to return a promise.
// // `server.close` does not return a promise on its own, so we manually
// // create one.
// function closeServer() {
//   return new Promise((resolve, reject) => {
//     console.log("Closing server");
//     server.close(err => {
//       if (err) {
//         reject(err);
//         // so we don't also call `resolve()`
//         return;
//       }
//       resolve();
//     });
//   });
// }

// // if server.js is called directly (aka, with `node server.js`), this block
// // runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
// if (require.main === module) {
//   runServer().catch(err => console.error(err));
// }

// module.exports = { app, runServer, closeServer };
module.exports = app;