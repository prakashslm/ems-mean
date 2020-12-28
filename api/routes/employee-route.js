import { Router } from 'express';

import { Employee } from '../schemas/employee';

const route = Router();

route.route('/employee').get(async (req, res) => res.send(await Employee.find()));

route.route('/employee/:id').get(async (req, res) => res.send(await Employee.findById({ _id: req.params.id })));

route.route('/employee').post(async (req, res) => {
  const {
    firstname, lastname, email, salary, dob
  } = req.body;
  const newEmployee = new Employee({
    firstname: firstname,
    lastname: lastname,
    email: email,
    salary: salary,
    dob: dob,
  });

  if (!(await Employee.findOne({ email: email }))) {
    const data = await newEmployee.save();
    return res.send({
      response: data, message: 'You have sucessfully register now employee'
    });
  }
  return res.status(403).send({
    message: 'User exist with this details, please try again with another details'
  });
});

route.route('/login').post(async (req, res) => {
  let userEmail = req.body.email;
  userEmail = await Employee.findOne({ email: userEmail });

  if (!userEmail) {
    return res.status(400).send({ message: 'Provide valid email address' });
  }

  return res.send({
    response: userEmail
  });
});

route.route('/employee/:id').put(async (req, res) => {
  const {
    id, firstname, lastname, email, salary, dob
  } = req.body;
  console.log(req.body, id, req.params.id);

  const updateResult = await Employee.updateOne(
    { _id: id },
    {
      $set: {
        firstName: firstname,
        lastName: lastname,
        email: email,
        salary: salary,
        dob: dob,
      }
    },
    { new: true, upsert: true },
  );
  console.log(updateResult);

  if (updateResult.nModified > 0) {
    return res.send({ message: 'Employee Updated Successfully' });
  }
  return res.status(400).send({ message: 'Unsucessful' });
});

route.route('/employee/:id').delete((req, res) => {
  Employee.deleteOne({ _id: req.params.id });
  return res.send({ message: 'Employee info deleted Successfully' });
});

exports = module.exports = route;
