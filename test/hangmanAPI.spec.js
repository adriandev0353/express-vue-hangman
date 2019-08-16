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
        it('should return a list of all records in the database', (done) => {
            request(app)
                .get('/api/list/size/2')
                .end((err, res) => {
                    expect(res.body.words).to.be.deep.equal('success');
                    expect(res.body.status).to.be.equal('success');
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
    });
});
