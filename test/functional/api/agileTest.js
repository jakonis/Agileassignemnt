const chai = require("chai"), chaiHttp = require('chai-http');
const expect = chai.expect;
const request = require("supertest");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const User = require("../../../models/users");
const mongoose = require("mongoose");
const _ = require("lodash");
let server;
let mongod;
let db, validID;
chai.use(chaiHttp);

describe("Userss", () => {
  before(async () => {
    try {
      mongod = new MongoMemoryServer({
        instance: {
          port: 27017,
          dbPath: "./test/database",
          dbName: "usersdb" // by default generate random dbName
        }
      });
      // Async Trick - this ensures the database is created before 
      // we try to connect to it or start the server
      await mongod.getConnectionString();
 
      mongoose.connect("mongodb://localhost:27017/usersdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      server = require("../../../bin/www");
      db = mongoose.connection;
    } catch (error) {
      console.log(error);
    }
  });

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });

  beforeEach(async () => {
    try {
      await User.deleteMany({});
      let user = new User();
      user.user = "Alanas";
      user.address = "New Ross";
      user.gender = "male";
      user.upvotes = 2;
      await user.save();
      user = new User();
      user.user = "Alanas";
      user.address = "New Ross";
      user.gender = "Female";
      await user.save();
      validID = user._id;
    } catch (error) {
      console.log(error);
    }
  });


describe("GET /users", () => {
  it("should GET all the users", done => {
    request(server)
      .get("/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        try {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);
          let result = _.map(res.body, user => {
            return {
              user: user.user,
              address: user.address,
              gender: user.gender
            };
          });
          expect(result).to.deep.include({
            user: "Alanas",
            address: "New Ross",
            gender: "male"
          });
          expect(result).to.deep.include({
            user: "Alanas",
            address: "New Ross",
            gender: "Female"
          });
          done();
        } catch (e) {
          done(e);
        }
      });
  });
})});
