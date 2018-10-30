import Server from '../server';
import CONFIG from '../config';
import { Member } from '../models/member';
import { Event } from '../models/event';
import { logger } from './logger';

let server: Server;

const start = async () => {
	try {
		server = await Server.createInstance();

		// const members = await Member.find()
		// 	// .limit(1)
		// 	.exec();
		// // logger.log('Members:', members);
		// members.forEach(member => {
		// 	logger.log(member.privateProfile);
		// });
		// for (const member of members) {
		// 	const update = await server.mongoose.connection.db
		// 		.collection('members')
		// 		.findOneAndUpdate(
		// 			{ _id: member._id },
		// 			{
		// 				$set: {
		// 					privateProfile: Boolean(member.privateProfile)
		// 				}
		// 			}
		// 		);

		// 	logger.log('Updated:', update);
		// 	// await Member.findByIdAndUpdate(member._id, {
		// 	// 	$set: {
		// 	// 		createdAt: new Date((member as any).createdAt)
		// 	// 		// updatedAt: new Date(member.updatedAt)
		// 	// 	}
		// 	// });
		// }

		// const events = await Event.find()
		// 	// .limit(1)
		// 	.exec();
		// // logger.log('Members:', members);
		// // events.forEach(event => {
		// // 	logger.log(event);
		// // 	// logger.log(event.createdAt);
		// // });
		// for (const event of events) {
		// 	const update = await server.mongoose.connection.db
		// 		.collection('events')
		// 		.findOneAndUpdate(
		// 			{ _id: event._id },
		// 			{
		// 				$set: {
		// 					privateEvent: Boolean(event.privateEvent)
		// 				}
		// 			}
		// 		);

		// 	// logger.log('Updated:', update);
		// }
	} catch (error) {
		logger.error('Error:', error);
	} finally {
		await server.mongoose.disconnect();
	}
};

start();
