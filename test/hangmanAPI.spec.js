/* eslint-disable handle-callback-err */
var chai = require('chai');
var request = require('supertest');
const express = require('express');
const HangmanMockApi = require('../hangman-api');
const HangmanService = require('./hangman-mock-service');
const AppRouting = require('../app-routing');
const bodyParser = require('body-parser');

var expect = chai.expect;
describe('API Tests', () => {
    const app = express();
    app.use(bodyParser.json());

    const hangmanService = HangmanService();
    const hangmanMockApi = HangmanMockApi(hangmanService);
    AppRouting(app, hangmanMockApi);

    describe('Testing fetching APIs that return lists from the database', () => {
        it('should return a list of all words in the database', (done) => {
            request(app)
                .get('/api/all/words')
                .end((err, res) => {
                    expect(res.body.words).to.be.deep.equal('success');
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a list of all users in the database', (done) => {
            request(app)
                .get('/api/all/users')
                .end((err, res) => {
                    expect(res.body.words).to.be.deep.equal('success');
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a list of all words the with a length of 2', (done) => {
            request(app)
                .get('/api/list/size/2')
                .end((err, res) => {
                    expect(res.body.words).to.be.deep.equal('success');
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a successful posting of a new word', (done) => {
            request(app)
                .post('/api/add/word/from/user')
                .send({ word: 'suspicious', user: 'dyllanhope' })
                .end((err, res) => {
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a successful posting of a user', (done) => {
            request(app)
                .post('/api/add/user')
                .send({ username: 'dyllanhope', password: '123' })
                .end((err, res) => {
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a successful posting of adding a winning word to a user', (done) => {
            request(app)
                .post('/api/add/to/user')
                .send({ username: 'dyllanhope', word: 'suspicious' })
                .end((err, res) => {
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a successful posting of deleting a user', (done) => {
            request(app)
                .post('/api/delete/user')
                .send({ username: 1 })
                .end((err, res) => {
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return that the user login is unauthorized', (done) => {
            request(app)
                .post('/api/login/check')
                .send({ username: 'dyllanhope', password: '123' })
                .end((err, res) => {
                    expect(res.body.auth).to.be.equal(false);
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a successful posting of checking for the user dyllanhope', (done) => {
            request(app)
                .get('/api/check/user/dyllanhope')
                .end((err, res) => {
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a successful posting of finding dyllanhopes personal data (game history)', (done) => {
            request(app)
                .get('/api/get/user/data/dyllanhope')
                .end((err, res) => {
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a successful posting of finding the user dyllanhope', (done) => {
            request(app)
                .get('/api/find/user/dyllanhope')
                .end((err, res) => {
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a successful posting of checking if a word already exists', (done) => {
            request(app)
                .get('/api/check/word/word')
                .end((err, res) => {
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a list of the new words added by users', (done) => {
            request(app)
                .get('/api/all/new/words')
                .end((err, res) => {
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a successful posting of setting the new word statuses', (done) => {
            request(app)
                .post('/api/set/new/word/status')
                .send({ word: 'mouse', status: 'confirmed' })
                .end((err, res) => {
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a successful posting of storing a new word in the "new_words" table', (done) => {
            request(app)
                .post('/api/store/new/word')
                .send({ word: 'mouse', user: 'dyllanhope' })
                .end((err, res) => {
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('should return a filter of all the games dyllanhope has won', (done) => {
            request(app)
                .get('/api/get/user/data/user/dyllanhope/choice/won')
                .end((err, res) => {
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
    });
});
