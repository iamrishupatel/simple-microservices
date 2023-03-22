const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express()

app.use(bodyParser.json());

app.use(cors({
  origin: "*"
}))


const events = [];

app.post('/events', async (req, res) => {
  const event = req.body;
  events.push(event);
  console.log("Incoming Event", event.type);
  try {
    await Promise.all([
      // post service
      axios.post('http://posts-clusterip-srv:8001/events', event),
      // comments service
      axios.post('http://comments-clusterip-srv:8002/events', event),
      // query service
      axios.post('http://query-clusterip-srv:8003/events', event),
      // moderation service
      axios.post('http://mod-clusterip-srv:8004/events', event),

    ])
    return res.send({}).end()

  } catch (e) {
    console.error(e.message);

  }

});

app.get("/events", (req, res) => {
  res.send(events);
})



app.listen(8005, () => {
  console.log('listening on http://localhost:8005');
})