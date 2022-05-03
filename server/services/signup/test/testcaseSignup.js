module.exports = {
    registerAccount: [{
        it: 'As a user I should validate if email is not pass',
        options: {
            email: '',
            password: 'Reset@123'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if email key existing',
        options: {
            password: 'Test@12'
        },
        status: 0
    },
    {
        it: 'As a user I should check valid email',
        options: {
            email: 'john1',
            password: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if password key existing',
        options: {
            email: 'john1@mailinator.com',
            password: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if password is not pass',
        options: {
            email: 'john1@mailinator.com',
            password: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if password is sha256 string with 64 characters',
        options: {
            email: 'john1@mailinator.com',
            password: '12345678910123456789101',
            firstName: 'super',
            lastName: 'mail',
            userType: 1
        },
        status: 0
    },
    {
        it: 'As a user I should validate if firstName is not passed',
        options: {
            email: 'john1@mailinator.com',
            password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267d',
            lastName: 'mail',
            userType: 1
        },
        status: 0
    },
    {
        it: 'As a user I should validate if firstName is passed as invalid',
        options: {
            email: 'john1@mailinator.com',
            password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267d',
            firstName: 'john@123',
            userType: 1
        },
        status: 0
    },
    {
        it: 'As a user I should validate if firstName is passed as blank',
        options: {
            email: 'john1@mailinator.com',
            password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267d',
            firstName: '',
            lastName: 'mail',
            userType: 1
        },
        status: 0
    },
    {
        it: 'As a user I should validate if lastName is not passed',
        options: {
            email: 'john1@mailinator.com',
            password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267d',
            firstName: 'john',
            userType: 1
        },
        status: 0
    },
    {
        it: 'As a user I should validate if lastName is passed as invalid',
        options: {
            email: 'john1@mailinator.com',
            password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267d',
            firstName: 'john',
            lastName: 'john@123',
            userType: 1
        },
        status: 0
    },
    {
        it: 'As a user I should validate if lastName is passed as blank',
        options: {
            email: 'john1@mailinator.com',
            password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267d',
            firstName: 'john',
            lastName: '',
            userType: 1
        },
        status: 0
    }
    ],
    verifyAccount: [{
        it: 'As a user, I should check blank email.',
        options: {
            email: '',
            otp: 123456
        },
        status: 0
    },
    {
        it: 'As a user, I should check email in request.',
        options: {
            otp: 0
        },
        status: 0
    },
    {
        it: 'As a user, I should check blank otp in request.',
        options: {
            email: 'abc@gmai.com',
            otp: 0
        },
        status: 0
    },
    {
        it: 'As a user, I should check blank otp in request as string.',
        options: {
            email: 'abc@gmai.com',
            otp: ''
        },
        status: 0
    },
    {
        it: 'As a user, I should check otp lenght.',
        options: {
            email: 'abc@gmai.com',
            otp: 12345
        },
        status: 0
    },
    {
        it: 'As a user, I should check invalid otp entered.',
        options: {
            email: 'john@mailinator.com',
            otp: 123457
        },
        status: 0
    }],
    resendOTP: [{
        it: 'As a user, I should check blank email.',
        options: {
            email: ''
        },
        status: 0
    },
    {
        it: 'As a user, I should check email in request.',
        options: {

        },
        status: 0
    },
    {
        it: 'As a user, I should check not email available.',
        options: {
            email: 'abc@gmai.com',
            otp: 0
        },
        status: 0
    }]
};
