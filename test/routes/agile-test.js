let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(require('chai-things'));
let datastore = require('../../models/users');
const User = require("../../../models/users");

chai.use(chaiHttp);
let _ = require('lodash' );

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
    })});

    describe("GET /users/:id", () => {
        describe("when the id is valid", () => {
          it("should return the matching user", done => {
            request(server)
              .get(`/users/${validID}`)
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(200)
              .end((err, res) => {
                expect(res.body[0]).to.have.property("user", "Alanas");
                expect(res.body[0]).to.have.property("address", "New Ross");
                expect(res.body[0]).to.have.property("gender", "Female");
                done(err);
              });
          });
        });
        describe("when the id is invalid", () => {
          it("should return the NOT found message", done => {
            request(server)
              .get("/users/9999")
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(200)
              .end((err, res) => {
                expect(res.body.message).equals("User NOT Found!");
                done(err);
              });
          });
        });
      });


      describe("POST /users", () => {
        it("should return confirmation message and update datastore", () => {
          const user = {
            user: "Alanas",
            address: "New Ross",
            gender: "Female"
          };
          return request(server)
            .post("/users")
            .send(user)
            .expect(200)
            .then(res => {
              expect(res.body.message).equals("User Successfully Added!");
              validID = res.body.data._id;
            });
        });
        after(() => {
          return request(server)
            .get(`/users/${validID}`)
            .expect(200)
            .then(res => {
              expect(res.body[0]).to.have.property("user", "Alanas");
              expect(res.body[0]).to.have.property("address", "New Ross");
              expect(res.body[0]).to.have.property("gender", "Female");
            });
        });
      });

      describe("PUT /users/:id/vote", () => {
        describe("when the id is valid", () => {
          it("should return a message and the user upvoted by 1", () => {
            return request(server)
              .put(`/users/${validID}/vote`)
              .expect(200)
              .then(resp => {
                expect(resp.body).to.include({
                  message: "User Successfully Upvoted!"
                });
                expect(resp.body.data).to.have.property("userpoints", 1);
              });
          });
          after(() => {
            return request(server)
              .get(`/users/${validID}`)
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(200)
              .then(resp => {
                expect(resp.body[0]).to.have.property("userpoints", 1);
              });
          });
        });
        describe("when the id is invalid", () => {
          it("should return a 404 and a message for invalid user id", () => {
            return request(server)
              .put("/users/1100001/vote")
              .expect(200);
          });
        });




});
});