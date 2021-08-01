require('dotenv').config();
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
const express = require("express");
const app = express();

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const auth = require('./routes/auth');

var cors = require("cors");


app.use(cors());

mongoose
.connect("mongodb://localhost/login-with-google")
.then(() => {
  console.log("Connected to database");
})
.catch((err) => console.error("Couldnot connected to database"));

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition:{
      info:{
          title:"Google API",
          description:"Google API information",
          contact:{
              name: "amititme68@gmail.com"
          },
          servers:["https://localhost:8000"]
      }
  },
  // ['.routes/*.js']
  apis:["server.js"]
}

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/googlelogin:
 *  post:
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: Enter the token
 *        schema:
 *          $ref: '#/definitions/User'
 *    responses:
 *      '200':
 *        description: A successful response
 * definitions:
 *   User:
 *     type: string
 *     required:
 *       -tokenId
 *     properties:
 *       tokenId:
 *         type: string
 */
app.use("/api", auth);

const port = process.env.PORT || 8000;


app.listen(port, () => console.log(`Listening on port ${port}...`));