const GeneralError = require('../util/GeneralError');
const REQUIRED = 'FIELD_REQUIRED';
const INVALID = 'FIELD_NOT_VALID';

/**
 * Created by Growexx on 04/06/2020
 * @name alidator
 */
class Validator {
    constructor (locale) {
        this.NOT_VALID = INVALID;
        this.REQUIRED = REQUIRED;

        if (locale) {
            this.__ = locale;
        }
    }

    /**
     * @desc This function is being used to validate email address
     * @author Growexx
     * @since 01/03/2021
     * @param {string} email Email
     */
    email (email) {
        if (!email) {
            throw new GeneralError(this.__(REQUIRED, 'Email'), 400);
        }

        if (!CONSTANTS.REGEX.EMAIL.test(email)) {
            throw new GeneralError(this.__(INVALID, 'Email'), 400);
        }
    }

    /**
     * @desc This function is being used to check password
     * @author Growexx
     * @since 01/03/2021
     * @param {string} password Password
     */
    password (password) {
        if (!password) {
            throw new GeneralError(this.__(REQUIRED, 'Password'), 400);
        }

        if (password.length !== 64) {
            throw new GeneralError(this.__(INVALID, 'Password'), 400);
        }
    }

    /**
     * @desc This function is being used to check first name
     * @author Growexx
     * @since 24/01/2022
     * @param {string} firstName First Name
     */
    firstName (firstName) {
        if (!firstName) {
            throw new GeneralError(this.__(REQUIRED, 'First Name'), 400);
        }

        if (!CONSTANTS.REGEX.FIRSTNAME.test(firstName)) {
            throw new GeneralError(this.__(INVALID, 'First Name'), 400);
        }
    }

    /**
     * @desc This function is being used to check last name
     * @author Growexx
     * @since 24/01/2022
     * @param {string} lastName Last Name
     */
    lastName (lastName) {
        if (!lastName) {
            throw new GeneralError(this.__(REQUIRED, 'Last Name'), 400);
        }

        if (!CONSTANTS.REGEX.SURNAME.test(lastName)) {
            throw new GeneralError(this.__(INVALID, 'Last Name'), 400);
        }
    }

    /**
     * @desc This function is being used to validate otp
     * @author Growexx
     * @param {string} id id
     * @since 27/03/2021
     */
    otp (otp, field = 'OTP') {
        if (!otp) {
            throw new GeneralError(this.__(REQUIRED, field), 400);
        }

        if (otp.toString().length !== CONSTANTS.OTPLENGTH) {
            throw new GeneralError(this.__(INVALID, field), 400);
        }
    }
}

module.exports = Validator;
