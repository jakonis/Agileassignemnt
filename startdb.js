const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const Review = require("./models/reviews");

async function foo() {
  const mongod = new MongoMemoryServer({
    instance: {
      port: 27017, // by default choose any free port
      dbName: "reviewsdb" //// by default generate random dbName
      // dbPath: "./test/database"
    }
  });
  try { 
  await mongod.getConnectionString();

  await mongoose.connect("mongodb://127.0.0.1:27017/reviewsdb");
  await mongod.getConnectionString();
 
    await Review.deleteMany({})
      let review = new Review();
      review.review = "visa";
      await review.save()
        review = new Review();
        review.review = "paypal";
     await   review.save()
     let reviews = await Review.find()
            console.log(reviews)
  }
      catch(error) {
        console.log(error)
      }
 
  // return await mongod.getConnectionString();
  // console.log( uri )
  // await mongod.stop();
}

foo();
//  bar()
