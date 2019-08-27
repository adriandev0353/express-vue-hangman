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
                .post('/api/add/word/suspicious')
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
    });
});
