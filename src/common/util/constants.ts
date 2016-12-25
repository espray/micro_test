/** Defines constants. */
let Constants = {
    ConfigKeys: {
        Enviroment: "enviroment",
        Logger: {
            Application: {
                Level: "enviroment.logger.application.level",
            },
        },
    },
    EnviromentType: {
        Development: "development",
        Production: "production",
        Testing: "testing",
    },
    ServiceType: {
        Api: "api",
        Linker: "linker",
        MatchMaker: "matchmaker",
        Www: "www",
    },
    WebConcurrency: "WEB_CONCURRENCY",
    WebMemory: "WEB_MEMORY",
    WebName: "WEB_NAME",
    WebPort: "PORT",
    WebScript: "WEB_SCRIPT",
};

export {
    Constants
};
