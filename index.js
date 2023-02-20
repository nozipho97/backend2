const express = require("express");
//db
const db = require("./Config");
//port
const port = parseInt(process.env.port) || 4000;
//Express App
const app = express();
const path = require('path');
//Router
const route = express.Router();
// Cors
const cors = require("cors");
//body-parser
const bodyParser = require("body-parser");

app.use(route, express.json, bodyParser.urlencoded({ extended: false }));

route.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "./view/index.html"));
  });

  route.get("/Users", (req, res) => {
    const strQry = `SELECT firstName,lastName,emailAdd,UserPass
      FROM Users
      `;
      db.query(strQry, (err, data) => {
        if (err) throw err;
        res.status(200).json({ result: data });
      });
  });
    

  route.get("/Products", (req, res) => {
    const strQry = `SELECT productName,productSize,productPrice
      FROM Products;
      `;
    //db
    db.query(strQry, (err, data) => {
      if (err) throw err;
      res.status(200).json({ result: data });
    });
  });



//   app.use(
//     route,
//     cors({
//       origin: ["http://127.0.0.1:8080", "http://localhost:8080"],
//       credentials: true,
//     }),
//     express.json,
//     bodyParser.urlencoded({ extended: false })
//   );
  
  app.listen(port, () => console.log(`app listening on port ${port}`));
  