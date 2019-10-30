var config = {
	port: 3000,
	secret: 'secret',
	redisUrl: 'redis://localhost',
	redisPort: 6379,
	redisHost: 'localhost',
	routes: {
		login: '/login',
		logout: '/logout',
		chat: '/chat',
		home: '/',
		register: '/register',
		facebookAuth: '/auth/facebook',
		facebookAuthCallback: '/auth/facebook/callback',
		googleAuth: '/auth/google',
		googleAuthCallback: '/auth/google/callback'
	},
	host: 'http://localhost:3000',
	facebook: {
		appID: '788118548283111',
		appSecret: '7d80ee0ff3e6ce99c28ebce70a12c606',
	},
	google: {
		clientID: '191973037323-4vbu33f6289glloh1jhcvq67l80a6q00.apps.googleusercontent.com',
		clientSecret: 'NOwgOaN0W50LAYqEGqOZFfLO'
	},
	crypto: {
		workFactor: 5000,
		keylen: 32,
		randomSize: 256
	},
	rabbitMQ: {
		URL: 'amqp://guest:guest@localhost:5672',
		exchange: 'packtchat.log'
	}
};

module.exports = config;