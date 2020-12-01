const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.json({message: "Hello World!"})
});

const port = process.env.port || 5000;
const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})
