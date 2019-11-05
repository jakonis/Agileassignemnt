"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;

var mongoose = require("mongoose");

var Review = require("./models/reviews");

function foo() {
  return _foo.apply(this, arguments);
}

function _foo() {
  _foo = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var mongod, review, reviews;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mongod = new MongoMemoryServer({
              instance: {
                port: 27017,
                // by default choose any free port
                dbName: "reviewsdb" //// by default generate random dbName
                // dbPath: "./test/database"

              }
            });
            _context.prev = 1;
            _context.next = 4;
            return mongod.getConnectionString();

          case 4:
            _context.next = 6;
            return mongoose.connect("mongodb://127.0.0.1:27017/reviewsdb");

          case 6:
            _context.next = 8;
            return mongod.getConnectionString();

          case 8:
            _context.next = 10;
            return Review.deleteMany({});

          case 10:
            review = new Review();
            review.review = "visa";
            _context.next = 14;
            return review.save();

          case 14:
            review = new Review();
            review.review = "paypal";
            _context.next = 18;
            return review.save();

          case 18:
            _context.next = 20;
            return Review.find();

          case 20:
            reviews = _context.sent;
            console.log(reviews);
            _context.next = 27;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 24]]);
  }));
  return _foo.apply(this, arguments);
}

foo(); //  bar()