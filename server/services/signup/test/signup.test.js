const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseSignup');
chai.use(chaiHttp);
const trueDataStatus = 1;
let validRegistration;

describe('Signup Account', () => {
    try {
        TestCase.registerAccount.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/auth/signup')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user I should not able to register with existing passowrd', (done) => {
            const registerUser = {
                email: 'super@mailinator.com',
                password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267d',
                firstName: 'super',
                lastName: 'mail',
                userType: 1,
                otp: 123456
            };
            validRegistration = registerUser;
            request(process.env.BASE_URL)
                .post('/auth/signup')
                .send(registerUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 422);
                    done();
                });
        });

        it('As a user I should register as user', (done) => {
            const registerUser = {
                email: 'john@mailinator.com',
                password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e',
                firstName: 'john',
                lastName: 'mail',
                userType: 1,
                otp: 123456
            };
            validRegistration = registerUser;
            request(process.env.BASE_URL)
                .post('/auth/signup')
                .send(registerUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.data.role, CONSTANTS.ROLE.USER);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a user I should validate if email is already registered but not verified', (done) => {
            const registerUser = {
                email: 'john@mailinator.com',
                password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e',
                firstName: 'john',
                lastName: 'mail',
                userType: 1
            };
            request(process.env.BASE_URL)
                .post('/auth/signup')
                .send(registerUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 400);
                    done();
                });
        });

        it('As a user I should validate if email is already registered and login', (done) => {
            const registerUser = {
                email: 'super@mailinator.com',
                password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e',
                firstName: 'super',
                lastName: 'mail',
                userType: 1
            };
            request(process.env.BASE_URL)
                .post('/auth/signup')
                .send(registerUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });


    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Verify Account', () => {
    try {
        TestCase.verifyAccount.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/auth/verify-account')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user, I should verify existing user user', (done) => {
            request(process.env.BASE_URL)
                .post('/auth/verify-account')
                .send({ email: validRegistration.email, otp: validRegistration.otp })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, trueDataStatus);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Resend OTP', () => {
    try {
        TestCase.resendOTP.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/auth/resend-otp')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user, I should send resend OTP to user', (done) => {
            request(process.env.BASE_URL)
                .post('/auth/resend-otp')
                .send({ email: validRegistration.email })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, trueDataStatus);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});
