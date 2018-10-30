import Server from './server';
import CONFIG from './config';
import { logger } from './utils/logger';
const { PORT, DB } = CONFIG;

const start = async () => {
	try {
		const server = await Server.createInstance();
		server.app.listen(PORT, () => {
			logger.info('CONFIG: ', CONFIG, `\nListening on port: ${PORT}`);
		});
		return server;
	} catch (error) {
		logger.error('Error:', error);
		return null;
	}
};

start();
