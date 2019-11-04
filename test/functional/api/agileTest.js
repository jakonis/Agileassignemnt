const chai = require("chai"), chaiHttp = require('chai-http');
const expect = chai.expect;
const request = require("supertest");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const Review = require("../../../models/reviews");
const User = require("../../../models/users");
const mongoose = require("mongoose");



const _ = require("lodash");
let server;
let mongod;
let db, validID;
