import * as nconf from "nconf";

class Configuration {
    public static reload(defaults?: { [index: string]: any }) {
        return this.instance = new this(defaults);
    }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    private static instance: Configuration;
    private config: nconf.Provider;

    /** Precedent defaults -> default.json -> file param -> user.config.json -> environment variables */
    private constructor(defaults?: { [index: string]: any }) {
        this.config = nconf
            .env()
            .file({
                file:
                "user.config.json",
            })
            .file({
                file:
                (<string> process.env.NODE_ENV || "development").toLowerCase() + ".json",
            })
            .file({
                file:
                "default.json",
            })
            .defaults(defaults);
    }

    /** Get the setting */
    public get(key: string): any {
        return this.config.get(key);
    }
}

export namespace Config {
    export function get(key: string): any {
        return Configuration.Instance.get(key);
    }

    export function reload(defaults?: { [index: string]: any }) {
        return Configuration.reload(defaults);
    }
}
