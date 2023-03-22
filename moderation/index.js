const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// 
const app = express();


app.use(bodyParser.json());
app.post('/events', async (req, res) => {
  const event = req.body;
  switch (event.type) {
    case 'commentCreated':
      const status = event.data.content.includes('orange') ? 'rejected' : 'approved';
      await axios.post('http://events-clusterip-srv:8005/events', {
        type: 'commentModerated',
        data: {
          ...event.data,
          status
        }
      }).catch(e => console.log(e.message))
      return res.send({});

    default:
      return res.send({});
  }

})


app.listen(8004, () => {
  console.log('moderation service started on http://localhost:8004');
})