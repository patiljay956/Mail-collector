const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { log } = require("console");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
});


app.post("/", function (req, res) {
    const F_name = (req.body.f_name);
    const L_name = (req.body.l_name);
    const mail = (req.body.email);

    var data = {
        members: [{

            email_address: mail,
            status: "subscribed",
            merge_fields: {
                FNAME: F_name,
                LNAME: L_name
            }
        }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = " "; // your co
    const options = {
        method: "POST",
        auth: " ",

    }

    const request = https.request(url, options, function (respose) {

        if (respose.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");

        }
        respose.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});


app.post("/failure", function (req, res) {
    res.redirect("/");
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server is up at the port: " + port);
});

