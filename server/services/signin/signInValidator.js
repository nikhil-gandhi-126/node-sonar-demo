const validation = require('../../util/validation');

/**
 * Class represents validations for signin.
 */
class SignInValidator extends validation {
    constructor (body, locale) {
        super(locale);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate request for sign in
     * @author Growexx
     * @since 12/01/2022
     */
    validate () {
        super.email(this.body.email);
        super.password(this.body.password);
    }
}


module.exports = SignInValidator;
