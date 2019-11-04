let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(require('chai-things'));
let datastore = require('../../models/reviews');

chai.use(chaiHttp);
let _ = require('lodash' );

describe('Reviewss', function (){
    beforeEach(() => {  
        while(datastore.length > 0) {
            datastore.pop();
        }  
        datastore.push( 
            {id: 1000000, review: 'PayPal', upvotes: 1}
        );
        datastore.push( 
            {id: 1000001, review: 'Direct', upvotes: 2}
        );
    });
    describe('GET /reviews', () => {
        it('should GET all the reviews', function(done) {
            chai.request(server)
                .get('/reviews')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(2);
                    let result = _.map(res.body, (review) => {
                        return { id: review.id,}; 
                    });
                    expect(result).to.include( { id: 1000000} );
                    expect(result).to.include( { id: 1000001} );
                    done();
                });
        });
    });
    describe('POST /reviews', function () {
        it('should return confirmation message and update datastore', function(done) {
            let review = { 
                review: 'Visa' ,
                upvotes: 0
            };
            chai.request(server)
                .post('/reviews')
                .send(review)
                .end( (err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Review Added!' ) ;
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/reviews')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).be.be.a('array');
                    let result = _.map(res.body, function (review) {
                        return { review: review.review, };
                    }  );
                    expect(result).to.include( { review: 'Visa'} );
                    done();
                });
        });
    });

    describe('PUT /reviews/:id/vote', function () {
        it('should return a message and the review upvoted by 1', function(done) {
            chai.request(server)
                .put('/reviews/1000001/vote')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    let review = res.body.data ;
                    expect(review).to.include( { id: 1000001, upvotes: 3  } );
                    done();
                });
        });
        it('should return a 404 and a message for invalid review id', function(done) {
            chai.request(server)
                .put('/reviews/1100001/vote')
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message','Invalid Review Id!' ) ;
                    done();
                });
        });

    });
    describe('DELETE /reviews/:id', function () {
        describe('when id is valid', function () {
            it('should return a confirmation message and the deleted review', function(done) {
                chai.request(server)
                    .delete('/reviews/1000001')
                    .end( (err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message','Review Successfully Deleted!' ) ;
                        done();
                    });
            });
            after(function  (done) {
                chai.request(server)
                    .get('/reviews')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).be.be.a('array');
                        let result = _.map(res.body, function (review) {
                            return { review: review.review, };
                        }  );
                        expect(result).to.not.include( { review: 'Visa'} );
                        done();
                    });
            });
        });
        describe('when id is invalid', function () {
            it('should return an error message', function(done) {
                chai.request(server)
                    .delete('/reviews/1000002')
                    .end( (err, res) => {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message','Review NOT DELETED!' ) ;
                        done();
                    });
            });
        });
    });
});