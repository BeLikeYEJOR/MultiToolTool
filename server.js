const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.static('public'));

app.listen(8080, () => {
    console.log('listing on port https://localhost:8080')
})