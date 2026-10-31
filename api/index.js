const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    phone: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    phone: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    phone: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    phone: "39-23-6423122",
  },
];

const generateId = () => {
  if (persons.length == 0) {
    return 1;
  }
  return Math.max(...persons.map((p) => Number(p.id))) + 1;
};

app.get("/", (request, response) => {
  response.send("<h1> hello world</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((p) => p.id !== id);
  console.log(persons);
  response.status(204).send("ok");
});

app.post("/api/persons", (request, response) => {
  const data = request.body;
  const { name, phone } = data;
  const newPerson = {
    name,
    phone,
    id: generateId(),
  };

  persons.push(newPerson);
  response.json(newPerson).end();
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
