const mongoose = require("mongoose");
const data = require("./creation_of_data");

// connection of monogodb;
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/showlist')
}
main().then(() => { console.log("connected successful to DB") }).catch(err => { console.log(err); })

const userschema = new mongoose.Schema({
    title: String,
    description: String,
    image: {
      filename: String,
      url: String,
    },
    price: Number,
    country: String,
    reviews: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Review",
      }
    ],
    logins:[
          {
            type: mongoose.Schema.ObjectId,
            ref: "login",
          }
        ],
  images:[
          {
            type: mongoose.Schema.ObjectId,
            ref: "images",
          }
        ],
 
});
// console.log(data);
// console.log(data);

// creating model
const list = mongoose.model("list", userschema);
// async function insert(data) { // Accept 'data' as a parameter
//     try {
//       await list.deleteMany({})
//       let data = data.data((obj)=>({...obj,logins:"67c7bd4003aca7a0d5a02e4a"}));
//         const result = await list.insertMany(data.data)
//         console.log('Data inserted successfully:', result);
//       }catch (error) {
//       console.error("Error inserting data:", error.message);
//     }

//   }
async function insert(data) { // Use 'async' instead of 'sync'
  try {
      await list.deleteMany({}); // Deletes all previous data
  
      // Correct the data transformation
      let transformedData = data.data.map(obj => ({ ...obj, logins: "67c7bd4003aca7a0d5a02e4a" }));
      
      // Insert transformed data into the list collection
      const result = await list.insertMany(transformedData);
      console.log('Data inserted successfully:', result);
  } catch (error) {
      console.error("Error inserting data:", error.message);
  }
}

insert(data);
  // list.find({}).then(li=>{console.log("insertion of the data is comeplete");
  // })

  // const List = mongoose.model("List", listSchema);
//   module.exports = list;