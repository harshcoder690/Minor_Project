const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const Port = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

//serp API
const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch(
    "feca2d1812b71d9baeb30d09421adf7c747d1805bd9129175ac75813e3ffad74"
);

const callback = function(data) {
    console.log(data["organic_results"]);
};

app.get("/search", function(req, res) {
    // Show result as JSON
    const { subject } = req.body;
    const params = {
        engine: "google",
        q: subject,
    };
    res.send(search.json(params, callback));
});


app.post("/api/doodle/", function(req, res) {

    console.log(req.body);
    //   res.send(req.body);
});

app.listen(Port, () => {
    console.log(`server is connected on port ${Port}/`)
})