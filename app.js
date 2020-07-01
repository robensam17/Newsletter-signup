
const express = require ("express");
const bodyParser = require ("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  const fistName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

//  console.log(fistName, lastName, email);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fistName,
          LNAME: lastName
        }
      }
    ]
  };

  //  74d5fa0ade07581108c4f54f9139b6ca-us10
  //  08e23125cc
      const jsonData = JSON.stringify(data);
      const url = "https://us10.api.mailchimp.com/3.0/lists/08e23125cc";

      const options = {
        method: "POST",
        auth: "robensas:74d5fa0ade07581108c4f54f9139b6ca-us10"
      };

      const request = https.request(url, options, function(response) {
        response.on("data", function(data) {
          console.log(response.message);

        })
      })

      request.write(jsonData);
      request.end();

    });

app.listen(3000, function() {
  console.log("up and running");
});
