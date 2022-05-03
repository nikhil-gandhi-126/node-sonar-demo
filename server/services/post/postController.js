
const PostService = require('./postService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for post.
 */
class PostController {
    /**
     * @desc This function is being used to get posts
     * @author Growexx
     * @since 26/02/2022
     * @param {Object} req Request
     * @param {function} res Response
     */
    static async getPosts (req, res) {
        try {
            const data = await PostService.signIn(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.LOGIN_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = PostController;
