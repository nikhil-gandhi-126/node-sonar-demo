const crypt = require('../../util/crypt');
const SignUpValidator = require('./signUpValidator');
const UtilFunctions = require('../../util/utilFunctions');
const Email = require('../../util/sendEmail');
const User = require('../../models').user;
const i18n = require('i18n');
const getData = '';
/**
 * Class represents services for Sign-up.
 */
class SignUpService {

    /**
     * @desc This function is being used to signUp user user
     * @author Growexx
     * @since 27/01/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBodyhours
     * @param {String} req.body.email email
     * @param {String} req.body.password password
     * @param {String} req.body.firstName firstName
     * @param {String} req.body.lastName lastName
     * @param {String} req.body.userType userType

     */
    static async signUp (req, locale) {
        const Validator = new SignUpValidator(req.body, locale);
        Validator.validate();
        const email = req.body;
        req.body.email = email.toLowerCase();
        const user = await SignUpService.isUserAlreadyRegister(req.body);
        if (!user) {

            const hash = await crypt.enCryptPassword(req.body.password);
            const otp = UtilFunctions.generateOtp();
            const userType = req.body.userType;
            await SignUpService.saveOrUpdateRegistrationUser(req.body, hash, otp, userType);
            const subject = 'Lets invent the future of work';
            const template = 'emailTemplates/verificationOtpMail.html';
            const appUrl = process.env.FRONTEND_URL;
            const templateVariables = { appUrl, otp };
            await Email.prepareAndSendEmail([req.body.email], subject, template, templateVariables);
            return { email: req.body.email, role: userType };
        } else if (!user.is_active) {
            throw {
                message: MESSAGES.INACTIVE_USER,
                statusCode: 400
            };
        } else {
            return await SignUpService.checkLogin(req.body.password, user);
        }
    }

    static async checkLogin (password, user) {
        const isMatch = await crypt.comparePassword(password, user.password);
        const otherDetails = {};
        if (!isMatch) {
            throw {
                message: MESSAGES.ALREADY_REGISTER,
                statusCode: 422
            };
        } else {
            const token = await crypt.getUserToken(user);
            delete user.password;
            delete user.__v;
            _.merge(user, token, otherDetails);
        }

        return user;
    }

    /**
     * @desc This function is being used to check email already exists for sign-up of user
     * @author Growexx
     * @since 27/01/2022
     * @param {Object} reqObj reqObj
     */
    static async isUserAlreadyRegister (reqObj) {
        return await User.findOne({ where: { email: reqObj.email } });
    }

    /**
     * @desc This function is being used to save or update user details
     * @author Growexx
     * @since 27/01/2022
     * @param {Object} reqObj Request
     * @param {Object} reqObj.body RequestBody
     * @param {Object} reqObj reqObj
     * @param {String} hash password
     * @param {Object} otp otp
     * @param {Integer} userType 1 = user 2 = Client
     */
    static async saveOrUpdateRegistrationUser (reqObj, hash, otp, userType) {
        const obj = {
            first_name: reqObj.firstName,
            last_name: reqObj.lastName,
            email: reqObj.email,
            password: hash,
            is_active: CONSTANTS.STATUS.PENDING,
            role: userType,
            otp
        };
        await User.create(obj);
    }


    /**
     * @desc This function is being used to verify user account
     * @author Growexx
     * @since 27/01/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email
     * @param {Object} req.body.otp otp
     */
    static async verifyAccount (req, locale) {
        const Validator = new SignUpValidator(req.body, locale);
        Validator.otpValidate();
        req.body.email = req.body.email.toLowerCase();
        let user = await User.findOne({ where: { email: req.body.email } });
        if (user && user.otp == req.body.otp) {
            await User.update({ is_active: CONSTANTS.STATUS.ACTIVE }, { where: { id: user.id } });
            user = await User.findOne({ where: { email: req.body.email } });
            return crypt.getUserToken(user);
        } else {
            throw {
                message: MESSAGES.INVALID_OTP,
                statusCode: 400
            };
        }
    }

    /**
     * @desc This function is being used to resent OTP in case of email not received
     * @author Growexx
     * @since 27/01/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email
     * @param {Object} req.body.otp otp
     */
    static async resentOTP (req, locale, hours) {
        const Validator = new SignUpValidator(req.body, locale);
        Validator.email(req.body.email);
        req.body.email = req.body.email.toLowerCase();
        const user = await User.findOne({ where: { email: req.body.email } });

        if (user) {
            const subject = 'Lets invent the future of work';
            const template = 'emailTemplates/verificationOtpMail.html';
            const appUrl = process.env.FRONTEND_URL;
            const templateVariables = { appUrl, otp: user.otp };
            await Email.prepareAndSendEmail([user.email], subject, template, templateVariables);
            return { email: req.body.email };
        } else if (!user) {
            throw {
                message: MESSAGES.USER_NOT_FOUND,
                statusCode: 400
            };
        }
    }

    static async getEmployeeList () {


        var x;
        const employees = [
            {
                'name': 'Nikhil',
                'code': 126
            },
            {
                'name': 'Jubin',
                'code': 128
            }
        ];
        const arr = [];
        for (let i = 0; i < employees.length; i++) {
            arr.name = 'bob';
        }

        const hash = await crypt.enCryptPassword(req.body.password);
        const otp = UtilFunctions.generateOtp();
        const userType = req.body.userType;
        await SignUpService.saveOrUpdateRegistrationUser(req.body, hash, otp, userType);
        const subject = 'Lets invent the future of work';
        const template = 'emailTemplates/verificationOtpMail.html';
        const appUrl = process.env.FRONTEND_URL;
        const templateVariables = { appUrl, otp };
        await Email.prepareAndSendEmail([req.body.email], subject, template, templateVariables);
        return { email: req.body.email, role: userType };
        return employees;
    }

    static async getEmployees () {
        // ...
        return await getEmployeeList(); // Noncompliant
    }
    static async numberOfMinutes () {

    }
}

module.exports = SignUpService;
