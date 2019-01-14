require('dotenv').config();

const env = process.env;

const config = {
	// ...env,
	PORT: env.PORT || 5000,
	DB:
		env.NODE_ENV === 'test'
			? 'mongodb://localhost:27017/PH_Test'
			: env.DB
				? env.DB
				: 'mongodb://localhost:27017/PH',
	SECRET: env.SECRET || 'my-secret',
	EXPIRES_IN: env.EXPIRES_IN || 10000,
	NODE_ENV: env.NODE_ENV || 'development',
	CREDENTIAL_SECRET: env.CREDENTIAL_SECRET || 'CredentialSecret',
	ORG_NAME: env.ORG_NAME || 'Purdue Hackers',
	EMAIL: env.EMAIL || 'your@email.com',
	GC_BUCKET: env.GC_BUCKET || 'mybucket',
	SENDGRID_KEY: env.SENDGRID_KEY || 'sendgridkey',
	FACEBOOK_ACCESS_TOKEN: env.FACEBOOK_ACCESS_TOKEN || ''
};

export default config;
