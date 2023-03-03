import { createClient } from "redis";
import { promisify } from "util

class RedisClient{
    constructor(){
        this.myClient = createClient();
        this.myClient.on('error', (err) => console.log(error));
    }

    isAlive(){
        client.ping((err, reply) => {
            if (err) {
                console.log('Redis is not alive');
            } else {
                console.log('Redis is alive');
            }
        });
    }

    async get(key){
        const getAsync = promisify(this.myClient.get).bind(this.myClient);
        return getAsync(key);
    }

    async set(key, value, time){
        const setAsync = promisify(this.myClient.set).bind(this.myClient);
        return setAsync(key, value, 'EX', time);
    }

    async del(key){
        const delAsync = promisify(this.myClient.del).bind(this.myClient);
        return delAsync(key);
    }
}

const redisClient = new RedisClient();
export default RedisClient;
