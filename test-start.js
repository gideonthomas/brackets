const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "*"
}));
app.use(express.static('.'));

app.listen(process.env.PORT, () => console.log("Listening"));
