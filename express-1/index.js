const express = require('express');
const findI = require('./aux/aux');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

function moment(req, res, next) {
  console.log('0');
  // res.send('writE');
  next();
}

const moment1 = (req, res, next) => {
  console.log('111');
  res.end();
  next();
}

// app.use(moment1);
// app.use(moment);

const list = [
  {id: 1, name: 'One'},
  {id: 2, name: 'Two'},
  {id: 3, name: 'Three'}
]

//root
// app.get('/', (req, res) => {
//   console.log('get')
//   res.send(`Hello, this is the root directory ('/')`);
// });
app.get('/', moment, moment1);


// get all array's items
app.get('/list', (req, res) => res.send(list));


// get a specific item from the array
app.get('/list/:id', (req, res) => {
  // const result = list.find(course => course.id === parseInt(req.params.id));
  const itemIndex = findI.searchItem(list, req.params.id);

  (!itemIndex) ? 
                res.status(404).send(`This item, ${req.params.id} does not exist.`) : 
                res.send(`id: ${list[itemIndex].id} -- Name: ${list[itemIndex].name}`);
//res.send(`Id: ${list[req.params.id].id} - Name: ${list[req.params.id].name}`));
});


// create a new item in the array
app.post('/new', (req, res) => {
  if (req.body.name) {
    const newItem = {
      id: list.length + 1,
      name: req.body.name
    }
    list.push(newItem);
    res.send(`${req.body.name} added!`);
    return
  }
  res.send('Error');
});


// update/change an item in the array
app.put('/list/:id', (req, res) => {
  // const itemIndex = list.findIndex((item) => item.id == req.params.id);
  const itemIndex = findI.searchItem(list, req.params.id);
console.log("itemIndex: ", itemIndex)
  if (itemIndex === false) {
    res.status(404).send(`Item ${req.params.id} does not exist`);
    return;
  }

  if (!req.body.name || req.body.name.length < 3) {
    res.status(404).send(`Name ${req.body.name} is not valid`);
    return;
  }
console.log("listBF: ", list);
  list[itemIndex].name = req.body.name;
console.log("listAFT: ", list);  
  res.send(`Name ${req.body.name} has been updated! Id: ${req.params.id}`);
});


// delete an item from the array
app.delete('/list/:id', (req, res) => {

  // res.send(`result: ${findItem(req.params.id)}`);
  const itemIndex = list.findIndex((item) => item.id === parseInt(req.params.id));

  if (itemIndex === -1){
    res.status(404).send(`${req.params.id} was not find.`);
    return
  }

  list.splice(itemIndex, 1);
  res.send(`Id ${req.params.id} was removed from the array.`);
})


// app is running and listening
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('+++++= ', server.address().host);
});
