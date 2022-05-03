const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../../../models').user;
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseForgotPassword');
chai.use(chaiHttp);

describe('Forgot Password', () => {
    try {
        TestCase.forgotPassword.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/auth/forgot-password')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user I should send forgot password link to user', (done) => {
            const data = {
                email: 'john@mailinator.com'
            };

            request(process.env.BASE_URL)
                .post('/auth/forgot-password')
                .send(data)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a user I should send forgot password link to client', (done) => {
            const data = {
                email: 'client@mailinator.com'
            };

            request(process.env.BASE_URL)
                .post('/auth/forgot-password')
                .send(data)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        TestCase.verifyToken.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/auth/verify-token')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user I should validate if expired token',
            async () => {
                const date = MOMENT().add(-1, 'day').utc();
                await User.update({ 'reset_expiry_time': date }, { where: { email: 'john@mailinator.com' } });
                const tokenData = await User.findOne({ where: { email: 'john@mailinator.com' } });

                const data = {
                    token: tokenData.reset_token
                };

                const res = await request(process.env.BASE_URL)
                    .post('/auth/verify-token')
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 400);
            });


        it('As a user I should validate if token',
            async () => {
                const date = MOMENT().add(1, 'day').utc();
                await User.update({ 'reset_expiry_time': date }, { where: { email: 'john@mailinator.com' } });
                const tokenData = await User.findOne({ where: { email: 'john@mailinator.com' } });

                const data = {
                    token: tokenData.reset_token
                };

                const res = await request(process.env.BASE_URL)
                    .post('/auth/verify-token')
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
            });

        TestCase.resetPassword.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/auth/reset-password')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user I should reset password with expired token',
            async () => {
                const date = MOMENT().add(-1, 'day').utc();
                await User.update({ 'reset_expiry_time': date }, { where: { email: 'john@mailinator.com' } });
                const tokenData = await User.findOne({ where: { email: 'john@mailinator.com' } });

                const data = {
                    token: tokenData.reset_token,
                    password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267d'
                };
                const res = await request(process.env.BASE_URL)
                    .post('/auth/reset-password')
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 400);
            });


        it('As a user I should validate if password',
            async () => {
                const date = MOMENT().add(1, 'day').utc();
                await User.update({ 'reset_expiry_time': date }, { where: { email: 'john@mailinator.com' } });
                const tokenData = await User.findOne({ where: { email: 'john@mailinator.com' } });

                const data = {
                    token: tokenData.reset_token,
                    password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
                };

                const res = await request(process.env.BASE_URL)
                    .post('/auth/reset-password')
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
            });


    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});
