/*eslint no-unused-vars: "off" */
var express = require("express")
var path = require("path")
let favicon = require("serve-favicon")
var logger = require("morgan")
var cookieParser = require("cookie-parser")
let bodyParser = require("body-parser")

let createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")

let indexRouter = require("./routes/index")
let usersRouter = require("./routes/users")

const reviews = require("./routes/reviews")
const users = require("./routes/users")

let app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
if (process.env.NODE_ENV !== "test") {  
  app.use(logger("dev"))
}
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/users", usersRouter)

app.get("/reviews/votes", reviews.findTotalVotes)
app.post("/reviews",reviews.addReview)
app.get("/reviews", reviews.findAll)
app.get("/reviews/:id", reviews.findOne)
app.put("/reviews/:id/vote", reviews.incrementUpvotes)
app.delete("/reviews/:id", reviews.deleteReview)

app.post("/users",users.addUser)
app.post("/users/search", users.findFuzzy)
app.get("/users", users.findAll)
app.get("/users/votes", users.findTotalVotes)
app.get("/users/:id", users.findOne)
app.put("/users/:id/vote", users.incrementUppoints)
app.delete("/users/:id", users.deleteUser)





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error("Not Found")
  err.status = 404
  next(err)
})
  
// error handlers
  
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render("error", {
      message: err.message,
      error: err
    })
  })
}
  
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render("error", {
    message: err.message,
    error: {}
  })
})
  


module.exports = app
