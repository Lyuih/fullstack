const mongoose = require("mongoose");

const url = `mongodb+srv://lyuihh574_db_user:UvkDKrcYXebfReJZ@cluster0.80kyyba.mongodb.net/persons
PORT=3001`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("PersonSchema", personSchema);

// const person = new Person({
//   name: "alax",
//   phone: "011-3333345",
// });
// person.save().then((result) => {
//   console.log("person saved");
//   mongoose.connection.close();
// });

module.exports = mongoose.model("PersonSchema", personSchema);
