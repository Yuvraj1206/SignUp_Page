const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const client = require("@mailchimp/mailchimp_marketing");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email1 = req.body.email;

client.setConfig({
  apiKey: "4e808a88ba46154c60de9bf8cd190cca-us21",
  server: "us21"
});

const run = async () => {
  const subscribingUser = {
      firstName: fname,
      lastName: lname,
      email: email1
    };
  const response = await client.lists.batchListMembers("07ffc72ee0", {
    members: [{
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName
      }
    }],
  });
  console.log(response);
  
  if(response.error_count === 0){
    res.sendFile(__dirname + "/success.html");
  }

  else{
    res.sendFile(__dirname + "/failure.html");
  }


};

run();

});

app.post("/failure", function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("server is running on port 3000");
});

//api key
//4e808a88ba46154c60de9bf8cd190cca-us21
//id
//07ffc72ee0
