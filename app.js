const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const _ = require('lodash');

const uri = "mongodb://localhost:27017/fruitsDB";
mongoose.set('strictQuery', true);
mongoose.connect(uri).then(() => console.log('baglandi'));

const ToySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
})

const PersonSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  favouriteToy: ToySchema
});

const Person = mongoose.model('Person', PersonSchema);

const Toy = mongoose.model('Toy', ToySchema);

const WoodenCar = new Toy({
  name: 'Jet',
  color: 'Red',
});

const Woody = new Toy({
  name: 'Woody',
  color: 'White',
});



const bebis3 = new Person({
  name: 'Bebis3',
  age: 3,
  favouriteToy: WoodenCar
});

// bebis.save().then(() => console.log('ingaaa'));

async function main() {

  const query = {
    name: {
      $regex: '^Bebis'
    }
  };
  const queryAll = {};

  // WoodenCar.save().then(() => console.log('wooden car saved'));
  // Woody.save();

  // bebis3.save().then(() => console.log('ingaaa3'));

  //update
  // const res = await Person.updateOne({ _id:'63f92c1dbf6ccfc2f9a08178' }, { name: 'Bebis3' });
  // Person.updateOne({name: 'Bebis3'}, {favouriteToy: Woody, age: 4}).then(() => console.log('Growing up!'));;

  // delete
  // const res = await Person.deleteOne({ name: 'Bebis3' });

  // deleteMany
  //const res = await Person.deleteMany(queryAll);


  //insert multiple
  // const range = _.range(1, 11);
  // console.log(range);

  // for (const x of range){
  //   let person = new Person({name: 'John' + x, age: x})
  //   person.save().then(console.log(x));
  // }

  // READ
  const people = await Person.find(queryAll);
  const toys = await Toy.find(queryAll);
  //console.log(people);

  let isimler = people.map(x => x.name);
  console.log(people);
  console.log(isimler);

  let oyuncakIsim = toys.map(x => x.name);
  console.log(toys);

  //close
  mongoose.connection.close(true);
  //process.exit()
}
main();