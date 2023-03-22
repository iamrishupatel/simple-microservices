const app = require('express')();
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const DB = {};

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  res.status(200).json(DB[postId] || []).end();
});

app.post('/posts/:id/comments', async (req, res) => {
  const id = randomBytes(4).toString('hex')
  const { content } = req.body;
  const postId = req.params.id;

  const comments = DB[postId] || [];
  comments.push({
    id,
    content,
    status: 'pending',
    postId,
  })

  DB[postId] = comments

  // emit event to event bus
  try {

    await axios.post('http://events-clusterip-srv:8005/events', {
      type: 'commentCreated',
      data: {
        id,
        content,
        status: 'pending',
        postId,
      }
    })
  } catch (e) {
    console.log("failed to emit commentCreated event")
  }

  res.status(200).json({
    message: "comment created successfully",
    data: {
      id,
      content
    }
  })
});


app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'commentModerated') {
    const { postId, id, status } = data;
    const comment = DB[postId].find((comment => comment.id === id))
    comment.status = status;

    await axios.post('http://events-clusterip-srv:8005/events', {
      type: 'commentUpdated',
      data: {
        ...comment
      }
    }).catch((e) => { console.log(e.message) });
  }

  res.send({})
})


app.get('/db', (req, res) => {
  res.status(200).send(`
  <p>Comments service DB</p>
  <pre>${JSON.stringify(DB, null, "\t")}</pre>
  `)
})

app.listen(8002, () => {
  console.log('listening on port 8002')
})
