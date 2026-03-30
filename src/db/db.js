const mongoose = require('mongoose');

async function connectDB(){
  await mongoose.connect("mongodb://yt:YNBZeqLh7o5iXOcX@ac-sgr2pzp-shard-00-00.lxamzdl.mongodb.net:27017,ac-sgr2pzp-shard-00-01.lxamzdl.mongodb.net:27017,ac-sgr2pzp-shard-00-02.lxamzdl.mongodb.net:27017/p-1?replicaSet=atlas-4fk4v8-shard-0&ssl=true&authSource=admin");
  console.log("connected to db");
}


module.exports = connectDB;
