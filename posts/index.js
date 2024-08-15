const app = require("express")();
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const DB = {};

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to post service</h1>");
});

app.post("/post/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  DB[id] = {
    id,
    title,
  };

  try {
    await axios.post("http://events-clusterip-srv:8005/events", {
      type: "postCreated",
      data: {
        id,
        title,
      },
    });
  } catch (e) {
    return res.send(e).end();
  }

  return res
    .status(201)
    .json({
      message: "post created successfully",
      data: {
        id: DB[id],
      },
    })
    .end();
});

app.get("/post", (req, res) => {
  res
    .status(200)
    .json({
      data: DB,
    })
    .end();
});

app.get("/db", (req, res) => {
  res.status(200).send(`
  <p>Post service DB</p>
  <pre>${JSON.stringify(DB, null, "\t")}</pre>
  `);
});

app.post("/events", (req, res) => {
  res.send({}).end();
});

app.listen(8001, () => {
  console.log("listening on http://localhost:8001");
});
