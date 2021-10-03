const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json())

const customers = [{ id: 1, name: 'John', cpf: '123', statement: ['233'] }];

const verifyIfExistAccount = (request, response, next) => {
  const { cpf } = request.headers;

  const customer = customers.find(c => c.cpf === cpf);

  if (!customer) return response.status(400).send({ error: "Customer not found" });

  request.customer = customer;

  return next()
}

app.post('/account', (request, response) => {
  const { name, cpf } = request.body;

  const customerAlreadyExist =  customers.some(customer => customer.cpf === cpf)

  if(customerAlreadyExist) return response.status(400).send({ error: "Customer already exists!" })

  customers.push({ id: uuidv4(), name, cpf, statement: [] })

  return response.sendStatus(201);
})

app.get('/statement', verifyIfExistAccount, (request, response) => {
  const { customer } = request

  return response.json(customer.statement)
})

app.post('/deposit', verifyIfExistAccount, (request, response) => {
  const { description, amount } = request.body;
  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit'
  }

  customer.statement.push(statementOperation);

  return response.status(201).send()
})

app.listen(3333)