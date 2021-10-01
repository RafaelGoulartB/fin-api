const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json())

const customers = [{ id: 1, name: 'John', cpf: '123', statement: ['233'] }];

app.post('/account', (request, response) => {
  const { name, cpf } = request.body;

  const customerAlreadyExist =  customers.some(customer => customer.cpf === cpf)

  if(customerAlreadyExist) return response.status(400).send({ error: "Customer already exists!" })

  customers.push({ id: uuidv4(), name, cpf, statement: [] })

  return response.sendStatus(201);
})

app.get('/statement/:cpf', (request, response) => {
  const { cpf } = request.params;

  const customer = customers.find(c => c.cpf === cpf);

  if(!customer) return response.status(404).send({ error: "Customer not found" });

  return response.json(customer.statement)
})

app.listen(3333)