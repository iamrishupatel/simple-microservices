const express = require('express');;
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios')

const DB = {};

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000'
}))


function handleEvents(type, data) {
  switch (type) {
    case 'commentCreated':
      const commentData = data
      DB[commentData.postId].comments.push({
        id: commentData.id,
        content: commentData.content,
        status: commentData.status
      })
      return 


    case 'postCreated':
      const postData = data;
      DB[postData.id] = {
        id: postData.id,
        title: postData.title,
        comments: []
      }
      return 

    case 'commentUpdated':
      const { postId, id, status, content } = data;
      const post = DB[postId];
      const comment = post.comments.find(comment => comment.id === id);
      comment.status = status;
      comment.content = content

      return 
    default:
      return
  }
}

app.post('/events', (req, res) => {
  const { type, data } = req.body
  handleEvents(type, data);
  return res.status(201).send({});


})

app.get('/posts', (req, res) => {
  res.status(200).json({
    data: DB
  })
})

app.get('/db', (req, res) => {
  res.status(200).send(`
  <p>Query service DB</p>
  <pre>${JSON.stringify(DB, null, "\t")}</pre>
  `)
})


app.listen(8003, async () => {
  console.log('listening on http://localhost:8003');
  const { data } = await axios.get('http://events-clusterip-srv:8005/events')
  data.forEach((event) => {
    handleEvents(event.type, event.data)
  })
})