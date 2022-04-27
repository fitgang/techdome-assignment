const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

//setting view engine to ejs
app.set("view engine", "ejs");

//route for index page
app.get("/", async function(req, res) {
  // Get the very first data
  const data = await getData();
  if (data.length == 0) res.sendStatus(500);

  // Render template
  res.render("index", { dataset: data });
});

app.listen(port, function() {
  console.log(`Server is running on port ${port}`);
});

async function getData() {
  const url = "https://api.spacexdata.com/v3/launches?limit=100";

  const fetch = (...args) =>
    import ('node-fetch').then(({ default: fetch }) => fetch(...args));
  try {
    const respose = await fetch(url),
      data = await respose.json();
    return data
  } catch (err) {
    return []
  }
}