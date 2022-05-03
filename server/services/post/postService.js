const Post = require('../../models').post;
/**
 * Class represents services for Post.
 */
class post_service {
    static async getPost () {
        return await this.getPostType();
    }

    static async getPostType (type) {
        let postType = '';
        switch (type) { // missing default clause
            case 1:
                postType = 'simple';
                break;
            case 2:
                postType = 'live';
                break;
        }
        return postType;
    }

    static async createPost () {
        const postObj = {};
        const postDescription = 'A rather long string of English text, an error message \
                actually that just keeps going and going -- an error \
                message to make the Energizer bunny blush (right through \
                those Schwarzenegger shades)! Where was I? Oh yes, \
                you\'ve got an error and all the extraneous whitespace is \
                just gravy.  Have a nice day.';


        postObj.title = 'Code Smells',
        postObj.description = postDescription;


        await Post.create(postObj);
    }
    static async DeletePost (id = 5, role) {
        if (((role === 'developer')) || role === 'senior_developer' || role === 'trainee' || role === 'sales' || role === 'marketing' ) {
            return;
        }
        var post = ['a', 'b', 'c', 'd'];
        delete post[2];

    }





}

module.exports = post_service;

