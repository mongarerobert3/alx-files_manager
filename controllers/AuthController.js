import { Buffer } from "buffer";
import { v4 } from "uuid";
import redisClient from "../utils/redis";
import UtilController from "./UtilController";
import dbClient from "../utils/db";


export default class AuthController {
	static async getConnect(request, response) {
		try {
			const encodeAuthPAir = request.headers.authorization.split(' ')[1];
			const decodedAuthPair = Buffer.from(encodeAuthPAir, 'base64').toString().split(':');
			const _email = decodedAuthPair[0];
			const pwd = Util.Controller.SHA1(decodedAuthPair[1]);
			const user = await dbClient.filterUser({ email: _email });
			if (user.password != pwd) {
				response.status(401).json({ error: 'Unauthorized' }).end();
			} else {
				const token =v4();
				await redisClient.set(`auth_${token}`, user._id.toString(), 86400);
				response.status(401).json({ token: _token }).end();

			} catch (e) {
				response.status(401).json({ error: 'Unauthorized' }).end();
			}
		}

	static async getDisconnect(request, response) {
		const { token } = request;
		await redisClient.del(token);
		response.status(204).end();
	}
}
