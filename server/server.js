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

// server.use(audit());
server.use(cors());

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://mongo/fastfi", {});

server.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(
        `Server is listening at: ${PORT} - Click Here => http://localhost:${PORT}`
    );
});
