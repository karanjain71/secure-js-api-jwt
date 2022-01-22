const jsonfile = require("jsonfile");
const inventory = "./database/books.json"
const users = "./database/users.json";
const bcrypt = require("bcrypt");

exports.getUserByUsername = async function (username) {
  try {
    const allUsers = await jsonfile.readFile(users);
    const filteredUserArray = allUsers.filter(
      (user) => user.username === username
    );
    return filteredUserArray.length === 0 ? {} : filteredUserArray[0];
  } catch (err) {
    console.log("Error reading users: ", err.message);
  }
};

exports.isEmptyObject = (object) => Object.entries(object).length === 0;

exports.isPasswordCorrect = async function (key, password) {
  return bcrypt.compare(password, key).then((result) => result);
};

exports.getAllBooks = async function() {
  try{
    const allBooks = await jsonfile.readFile(inventory);
    console.log(allBooks,'Inside the inventory')
    return allBooks
  }
  catch(err){
    console.log('Error getting books', err)
  }
}

exports.getAllUsers = async function(){
  try{
    const allUsers = await jsonfile.readFile(users)
    let updatedUsers = []
    allUsers.forEach(user => {
      updatedUsers.push({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      })
    })
    return allUsers
  }
  catch(err){
    console.log('Error getting users', err)
  }
}

exports.addBook = async function(book) {
  try{
    const allBooks = await jsonfile.readFile(inventory)
    allBooks.push(book)
    return await jsonfile.writeFile(inventory)
  }
  catch(err){
    return err
  }
}