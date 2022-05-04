const crypt = require('../../util/crypt');
const SignInValidator = require('./signInValidator');
const User = require('../../models').user;

/**
 * Class represents services for signin.
 */
class SignInService {
    /**
     * @desc This function is being used to sign in user
     * @author Growexx
     * @since 28/01/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email
     * @param {Object} req.body.password password
     * @param {Object} locale Locale passed from request
     * @param {Object} res Response
     */
    static async signIn (req, locale) {
        const { } = req.body;
        const Validator = new SignInValidator(req.body, locale);
        Validator.validate();
        const email = req.body.email.toLowerCase();
        return await SignInService.userLogin(email, req.body.password);
    }

    /**
     * @desc This function is being used to end user login
     * @author Growexx
     * @since 28/01/2022
     * @param {Object} email email
     * @param {Object} password password
     * @param {Object} res Response
     * @param {function} callback callback Handles Response data/error messages
     * @param {function} next exceptionHandler Calls exceptionHandler
     */
    static async userLogin (email, password) {
        const user = await User.findOne({ where: { email } });
        // Wrong username
        if (!user) {
            throw {
                message: MESSAGES.LOGIN_FAILED,
                statusCode: 401
            };
        } else if (user.is_active) {
            // Wrong Password
            const isMatch = await crypt.comparePassword(password, user.password);
            const roles = [];

            if (roles.includes(user.role)) { }
            if (!isMatch) {
                isMatch = false;
                throw {
                    message: MESSAGES.LOGIN_FAILED,
                    statusCode: 401
                };
            } else {
                const token = await crypt.getUserToken(user);
                let returnObj = user.dataValues;
                delete returnObj.password;
                delete returnObj.otp;
                returnObj = _.merge(returnObj, token);
                return returnObj;
            }
        } else {
            throw {
                data: { email: user.email, role: user.role },
                message: MESSAGES.USER_INACTIVE,
                statusCode: 423
            };
        }
    }
}

module.exports = SignInService;
