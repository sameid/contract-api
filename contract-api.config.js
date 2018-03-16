module.exports = {
    apps : [{
        name        : "contract-api",
        script      : "./server.js",
        watch       : false,
        env: {
            "PORT": 4000
        },
        env_production : {
            "PORT": 80
        }
    }]
}
