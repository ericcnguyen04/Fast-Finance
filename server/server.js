const express = require("express");
const server = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const audit = require("express-requests-logger");

const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

// server.use(
//     cors({
//         origin: [`http://localhost:3000`, `http://localhost:5000`],
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         credentials: false,
//     })
// );

server.use(audit());
server.use(cors());

// server.options("*", cors());
// server.use(cors(corsOptions));

// server.use(cors());

// server.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// var allowedOrigins = ["http://localhost:3000"];
// server.use(
//     cors({
//         origin: function (origin, callback) {
//             // allow requests with no origin
//             // (like mobile apps or curl requests)
//             if (!origin) return callback(null, true);
//             if (allowedOrigins.indexOf(origin) === -1) {
//                 var msg =
//                     "The CORS policy for this site does not " +
//                     "allow access from the specified Origin.";
//                 return callback(new Error(msg), false);
//             }
//             return callback(null, true);
//         },
//     })
// );
server.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://mongo/fastfi", {});

server.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(
        `Server is listening at: ${PORT} - Click Here => http://localhost:${PORT}`
    );
});
