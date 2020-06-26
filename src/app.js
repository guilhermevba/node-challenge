const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");
const { response } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.send(repositories)
});

app.post("/repositories", (request, response) => {
  const repository = {
    id: uuid(),
    likes: 0,
    ...request.body,
  }
  repositories.push(repository)
  return response.send(repository)
});

app.put("/repositories/:id", (request, response) => {
  const index = repositories.findIndex(({ id }) => request.params.id === id)
  if (index === -1) {
    return response.status(400).send()
  }

  const updatedRepository = {
    ...request.body,
    id: repositories[index].id,
    likes: repositories[index].likes
  }
  repositories.splice(index, 1, updatedRepository)
  response.send(updatedRepository)
});

app.delete("/repositories/:id", (request, response) => {
  const index = repositories.findIndex(({ id }) => request.params.id === id)
  if(index === -1) {
    return response.status(400).send()
  }
  repositories.splice(index, 1)
  response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const index = repositories.findIndex(({ id }) => request.params.id === id)
  if (index === -1) {
    return response.status(400).send()
  }

  const updatedRepository = {
    ...repositories[index],
    likes: repositories[index].likes + 1
  }
  repositories.splice(index, 1, updatedRepository)
  response.send(updatedRepository)
});

module.exports = app;
