const express = require("express");
const server = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const routes = require("./routes");

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
