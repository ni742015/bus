import Bus from "bus-core";
import Api from "./apis";
import Model from "./models";
import Schema from "./schemas";

const bus = new Bus({
    config: {
        serect: 'bus',
        excludeCheckUrl: [
            {url: /user$/, methods: ['GET']}
        ]
    },
    Api,
    Model,
    Schema
})

bus.start().then(app => {
    console.info('app start', app);
    console.log('app', app);
    
})