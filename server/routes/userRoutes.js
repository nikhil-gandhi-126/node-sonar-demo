const router = require('express').Router();
const UploadMiddleWare = require('../middleware/upload');
const AclMiddleWare = require('../middleware/acl');
const AuthMiddleWare = require('../middleware/auth');

const userProfileController = require('../services/userProfile/userProfileController');


router.get('/details', AuthMiddleWare, AclMiddleWare, userProfileController.getUserDetails);
router.put('/picture', AuthMiddleWare, AclMiddleWare, UploadMiddleWare.single('photo'), userProfileController.updateProfilePicture);
router.delete('/picture', AuthMiddleWare, AclMiddleWare, userProfileController.deleteProfilePicture);
router.put('/password', AuthMiddleWare, AclMiddleWare, userProfileController.changePassword);
router.put('/update-profile', AuthMiddleWare, AclMiddleWare, userProfileController.updateProfile);

module.exports = router;
