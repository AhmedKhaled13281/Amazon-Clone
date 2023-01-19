const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

const stripe = require("stripe")("sk_test_51MRLShJrFE8HiED6eoA7YY63VpwfCPuNahkcBQU8GJ0E6niCRVth6d8wr6WuKGDU6UJDxYeArGAxtj0JRmNbksGR00686Igmff");

const app = express();
app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello From Cloud")
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
});

app.post("/payment/create", async (request, response) => {
    const total = request.query.total;
  
    console.log("Payment request received", total);
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
  
    // Good
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.api = functions.https.onRequest(app);
