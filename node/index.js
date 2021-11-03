const express = require("express");
const mysql = require("mysql");
const app = express();
const PORT = 3000;

const connection = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: "root",
  database: "dbnode",
});

const insert = `INSERT INTO people (name) VALUES ("eduardo")`;

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

connection.query(insert);

app.get("/", async (req, res) => {
  const sql = "select * from people";
  await connection.query(sql, (error, results) => {
    if (error) throw error;
    res.send(`<h1>Full Cycle Rocks!</h1>
            <ul>    
                ${results.map((item) => `<li> ${item.name} </li>`).join("")}
            </ul>
            `);
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000.");
});
