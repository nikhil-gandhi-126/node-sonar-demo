const Post = require('../../models').post;
const data = null;
/**
 * Class represents services for Post.
 */
class post_service {
    static async getPost (req) {
        const postType = req.body.post_typee === 1 ? 'simple' : req.body.post_typee === 2 ? 'live' : 'video';
        return await this.getPostType(postType, userId = 1);
    }

    static async getPostType (type) {
        let postType = '';
        switch (type) { // missing default clause
            case 1:
                postType = 'live';
                break;
            default:
                postType = 'simple';
                break;
            case 2:
                postType = 'video';
                break;
        }
        return postType;
    }

    static async getPostById (id) {
        const posts = [{
            'id': 1,
            'title': 'first post'
        }, {
            'id': 2,
            'title': 'second post'
        }, {
            'id': 3,
            'title': 'third post'
        }, {
            'title': 'fourth post'
        }];
        const postData = posts.find((post) => {
            if (post.id === undefined) {
                console.log(post.length);
            } else {

                post.id == id;
            }
        });

        return postData;
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

    static async getActivePost () {

        const posts = [{
            'id': 1,
            'status': 'active',
            'title': 'first post'
        }, {
            'id': 2,
            'status': 'active',
            'title': 'second post'
        }, {
            'id': 3,
            'status': 'inactive',
            'title': 'third post'
        }, {
            'id': 4,
            'title': 'fourth post',
            'status': 'active'
        }];
        const activePosts = [];
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].status === 'inactive') {
                continue;
            } else {
                activePosts.push(posts[i]);
            }
        }
    }



}

module.exports = post_service;

