import Bus from "bus-core";
import Api from "./apis";
import Model from "./models";
import Schema from "./schemas";

const bus = new Bus({
    config: {
        port: 3000,
        apiPrefix: 'api',
        mongodb: {
            url: 'mongodb://test:test@localhost:27017/test',
            options: {
                useNewUrlParser: true,
                poolSize: 10
            }
        },
        jwt: {
            secert: 'bus',
            excludeUrls: [
                /\/test/,
                {url: '/user', methods: ['GET']}
            ]
        }
    },
    Api,
    Model,
    Schema
})

bus.start().then(app => {
    console.info('app start', app);
    console.log('app', app);
    
})