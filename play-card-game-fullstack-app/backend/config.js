module.exports = function () {
    switch (process.env.NODE_ENV) {
        case 'dev':
            return {
                'APP_PORT': 8081,
                'MONGO_URI': 'mongodb://localhost/fullstack_db',
                'AUTHORIZATION_KEY': 'UFNST0dSQU1NRVIgU09GVENFTEwgQ1lPUiBISUVSQVJDSFkgVSVB',
                'REFRESH_INTERVAL': 30000,
                'EMAIL': {
                    'HOST': 'smtp.gmail.com',
                    'SECURE': false,
                    'PORT': '587',
                    'USERNAME': 'abc@gmail.com',
                    'PASSWORD': 'abc@123',
                    'FROM': 'abc@gmail.com',
                    'TO': 'abc@gmail.com'
                }
            };
    }
};