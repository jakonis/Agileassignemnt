# Assignment 1 - Agile Software Practice.

Alanas Jakonis
20076515
Software Systems Development

## Overview.

Reviews of users , each review has upvotes. Users have name,address,gender and userpoints. Users can be upvoted. Admin is able do delte users edit user and same with the reviews. There is fuzzy search implement in users, incase admin wants to search uses without full of their name. App also allows to show most upvoted user and review.

## API endpoints.

app.get('/reviews/votes', reviews.findTotalVotes); //Find total ammount votedon reviews
app.post('/reviews',reviews.addReview); // Add review
app.get('/reviews', reviews.findAll); // Get all reviews
app.get('/reviews/:id', reviews.findOne); // Get induvidual review by id
app.put('/reviews/:id/vote', reviews.incrementUpvotes); // Upvote review by id
app.delete('/reviews/:id', reviews.deleteReview);  // Delete review by id

app.post('/users',users.addUser); // Add user
app.post('/users/search', users.findFuzzy); // Fuzzy serach an user
app.get('/users', users.findAll); // Get all users
app.get('/users/votes', users.findTotalVotes); //Find total ammount votedon users
app.get('/users/:id', users.findOne); // Get induvidual user by id
app.put('/users/:id/vote', users.incrementUppoints); // Upvote user by id
app.delete('/users/:id', users.deleteUser); // Delete user by id

## Data model.

Users Model

     {
          "userpoints": 0,
          "_id": "5dc14582f7205d0388ea959e",
          "user": "Alanas",
          "address": "New Ross",
          "gender": "male",
     },

Review Model

     {
          "upvotes": 0,
          "_id": "5dc14582f7205d0388ea95a1",
          "review": "very bad",
     }


## Sample Test execution.
~~~
.Successfully Connected to [ admin ]
Successfully Connected to [ admin ]
GET /users 200 15.592 ms - 394
GET /users 200 15.592 ms - 394
      √ should GET all the users (42ms)
    GET /users/:id
      when the id is valid
GET /users/5dc14c071007ab0a2861a698 200 6.924 ms - 199
GET /users/5dc14c071007ab0a2861a698 200 6.924 ms - 199
        √ should return the matching user
      when the id is invalid
GET /users/9999 200 1.833 ms - 220
GET /users/9999 200 1.833 ms - 220
        √ should return the NOT found message
    POST /users
POST /users 200 9.102 ms - 158
POST /users 200 9.102 ms - 158
      √ should return confirmation message and update datastore
GET /users/5dc14c071007ab0a2861a69d 200 5.376 ms - 199
GET /users/5dc14c071007ab0a2861a69d 200 5.376 ms - 199
    PUT /users/:id/vote
      when the id is valid
PUT /users/5dc14c071007ab0a2861a69f/vote 200 17.916 ms - 160
PUT /users/5dc14c071007ab0a2861a69f/vote 200 17.916 ms - 160
        √ should return a message and the user upvoted by 1
GET /users/5dc14c071007ab0a2861a69f 200 5.323 ms - 199
GET /users/5dc14c071007ab0a2861a69f 200 5.323 ms - 199
      when the id is invalid
PUT /users/1100001/vote 200 0.514 ms - 229
PUT /users/1100001/vote 200 0.514 ms - 229
        √ should return a 404 and a message for invalid user id
      DELETE /users/:id
        when id is valid
DELETE /users/1000001 200 1.303 ms - 231
DELETE /users/1000001 200 1.303 ms - 231
          √ should return a confirmation message and the deleted user
GET /users 200 5.919 ms - 394
GET /users 200 5.919 ms - 394
        when id is invalid
DELETE /users/1000002 200 0.602 ms - 231
DELETE /users/1000002 200 0.602 ms - 231
          √ should return an error message
    POST /users/search
POST /users/search 200 8.265 ms - 236
POST /users/search 200 8.265 ms - 236
      √ should work like a fuzzy search so should return users without full title 
    Reviewss
GET /reviews 200 5.652 ms - 268
GET /reviews 200 5.652 ms - 268
        √ should GET all the reviews
      GET /reviews/:id
        when the id is valid
GET /reviews/5dc14c081007ab0a2861a6af 200 5.398 ms - 137
GET /reviews/5dc14c081007ab0a2861a6af 200 5.398 ms - 137
          √ should return the matching review
        when the id is invalid
GET /reviews/9999 200 0.542 ms - 224
GET /reviews/9999 200 0.542 ms - 224
          √ should return the NOT found message
      POST /reviews
POST /reviews 200 7.584 ms - 123
POST /reviews 200 7.584 ms - 123
        √ should return confirmation message and update datastore
GET /reviews/5dc14c081007ab0a2861a6b8 200 5.129 ms - 138
GET /reviews/5dc14c081007ab0a2861a6b8 200 5.129 ms - 138
      PUT /reviews/:id/vote
        when the id is valid
PUT /reviews/5dc14c081007ab0a2861a6bc/vote 200 13.220 ms - 124
PUT /reviews/5dc14c081007ab0a2861a6bc/vote 200 13.220 ms - 124
          √ should return a message and the review upvoted by 1
GET /reviews/5dc14c081007ab0a2861a6bc 200 5.196 ms - 137
GET /reviews/5dc14c081007ab0a2861a6bc 200 5.196 ms - 137
        when the id is invalid
PUT /reviews/1100001/vote 200 0.672 ms - 233
PUT /reviews/1100001/vote 200 0.672 ms - 233
          √ should return a 404 and a message for invalid review id
      DELETE /reviews/:id
        when id is valid
DELETE /reviews/1000001 200 0.580 ms - 235
DELETE /reviews/1000001 200 0.580 ms - 235
          √ should return a confirmation message and the deleted review
GET /reviews 200 5.618 ms - 268
GET /reviews 200 5.618 ms - 268
        when id is invalid
DELETE /reviews/1000002 200 0.461 ms - 235
DELETE /reviews/1000002 200 0.461 ms - 235
          √ should return an error message


  17 passing (2s)
~~~

## Extra features.

Fuzzy serach was implement , in order to help out users to serach user without typing out their full name. Testing for fuzzy serach was also implemented.