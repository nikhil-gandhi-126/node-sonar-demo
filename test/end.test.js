const chai = require('chai');
const assert = chai.assert;
const User = require('../server/models').user;
describe('Delete records after testcase executed', () => {

    it('Delete user records after test comeplete', (done) => {
        Promise.all([
            User.destroy({ where: {} })
        ]).then(() => {
            done();
        }).catch(() => {
            assert(true, false);
        });
    });
});
