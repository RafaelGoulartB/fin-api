const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json())

const customers = [{ id: 1, name: 'John', cpf: '123' }];

app.post('/account', (request, response) => {
  const { name, cpf } = request.body;

  const customerAlreadyExist =  customers.some(customer => customer.cpf === cpf)

  if(customerAlreadyExist) return response.status(400).send({ error: "Customer already exists!" })

  customers.push({ id: uuidv4(), name, cpf })

  return response.sendStatus(201);
})

app.listen(3333)