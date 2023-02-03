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
  try {
    await Promise.all([
      // post service
      axios.post('http://localhost:8001/events', event),
      // comments service
      axios.post('http://localhost:8002/events', event),
      // query service
      axios.post('http://localhost:8003/events', event),
      // moderation service
      axios.post('http://localhost:8004/events', event),

    ])
    return res.send({}).end()

  } catch (e) {
    console.error(e.message);

  }

});

app.get("/events", (req,res) => {
  res.send(events);
})



app.listen(8005, () => {
  console.log('listening on http://localhost:8005');
})