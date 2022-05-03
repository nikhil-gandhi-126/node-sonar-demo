
const SignInService = require('./signInService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for signin.
 */
class SignInController {
    /**
     * @desc This function is being used to login
     * @author Growexx
     * @since 26/02/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email
     * @param {Object} req.body.password password
     * @param {function} res Response
     */
    static async login (req, res) {
        try {
            const data = await SignInService.signIn(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.LOGIN_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = SignInController;
