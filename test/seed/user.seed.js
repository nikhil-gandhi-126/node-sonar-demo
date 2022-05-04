const password = '400f5feac00716773753dcae08056aaf:a15de8a85f5f3637a9088a461fdd8a5263ae25c75dffef5a874498871c825617684b76734e1a5bf58609140aa1db462dd425f917d7ceff7f49eb8b285f6972dd7483a8feff3920f66319dbf118f7e982';
// const password = '1234';
module.exports = {
    users: [{
        id: '97dc4f70-6fbe-11ec-9c58-6bbf3a1ecb80',
        email: 'user@mailinator.com',
        role: 1,
        is_active: 1,
        otp: 123456,
        image: '',
        first_name: 'user',
        last_name: 'last',
        createdAt: '2022-01-27 18:26:52.188+05:30',
        updatedAt: '2022-01-27 18:26:52.188+05:30',
        password
    },
    {
        id: '69d3a470-6fbe-11ec-9e5a-afdbd34c7759',
        email: 'inactive@mailinator.com',
        role: 1,
        is_active: 0,
        otp: 123456,
        image: '',
        first_name: 'inactive',
        last_name: 'last',
        createdAt: '2022-01-27 18:26:52.188+05:30',
        updatedAt: '2022-01-27 18:26:52.188+05:30',
        password
    },
    {
        id: 'fd604030-6fb5-11ec-8827-193cece4754b',
        email: 'super@mailinator.com',
        role: 4,
        is_active: 1,
        otp: 123456,
        image: '',
        first_name: 'Test',
        last_name: 'Admin',
        createdAt: '2022-01-27 18:26:52.188+05:30',
        updatedAt: '2022-01-27 18:26:52.188+05:30',
        password
    },
    {
        id: '0e71dd10-bda8-4762-9d3f-cab5c9233511',
        email: 'noaccess@mailinator.com',
        role: 2,
        is_active: 1,
        otp: 123456,
        image: '',
        first_name: 'noaccess',
        last_name: 'user',
        createdAt: '2022-01-27 18:26:52.188+05:30',
        updatedAt: '2022-01-27 18:26:52.188+05:30',
        password
    }]
};
