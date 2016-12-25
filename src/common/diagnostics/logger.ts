import * as bunyan from "bunyan";
import * as sourceMapSupport from "source-map-support";
import { Config } from "../configuration/config";
import { Constants } from "../util/constants";

export interface Logger {
    trace(message: string): void;
    debug(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(error: Error, format?: any, ...params: any[]): void;
    error(buffer: Buffer, format?: any, ...params: any[]): void;
    error(obj: Object, format?: any, ...params: any[]): void;
    error(format: string, ...params: any[]): void;
    fatal(message: string): void;
}

export class ApplicationLogger implements Logger {
    private static instance: ApplicationLogger;
    private log: bunyan.Logger;

    private constructor() {
        let enviroment = Config.get(Constants.ConfigKeys.Enviroment);
        let loggerStreams: bunyan.Stream[] = [{ level: bunyan.TRACE, stream: process.stdout }];

        if (enviroment === Constants.EnviromentType.Production) {
            let loglevel = Config.get(Constants.ConfigKeys.Logger.Application.Level) || bunyan.INFO;
            loggerStreams.push({ level: loglevel });
        }

        this.log = bunyan.createLogger({
            name: "application",
            serializers: {
                err: bunyan.stdSerializers.err,
                req: bunyan.stdSerializers.req,
                res: bunyan.stdSerializers.res,
            },
            src: true,
            streams: loggerStreams,
        });
    }

    public trace(message: string): void {
        this.log.trace(message);
    }

    public debug(message: string): void {
        this.log.debug(message);
    }

    public info(buffer: Buffer, format?: any, ...params: any[]): void;
    public info(error: Error, format?: any, ...params: any[]): void;
    public info(obj: Object, format?: any, ...params: any[]): void;
    public info(format: string, ...params: any[]): void;
    public info(message: string): void;
    public info(obj?: Object, format?: any, ...params: any[]): void {
        if (obj && typeof obj === "string") {
            return this.log.info(format, params);
        } else
        if (obj && obj instanceof Error) {
            return this.log.info(obj, format, params);
        } else
        if (obj && obj instanceof Buffer) {
            return this.log.info(obj, format, params);
        }

        this.log.info(obj, format, params);
    }

    public warn(message: string): void {
        this.log.warn(message);
    }

    public error(buffer: Buffer, format?: any, ...params: any[]): void;
    public error(error: Error, format?: any, ...params: any[]): void;
    public error(format: string, ...params: any[]): void;
    public error(obj: Object, format?: any, ...params: any[]): void
    public error(obj?: any, format?: any, ...params: any[]): void {
        if (obj && typeof obj === "string") {
            return this.log.error(format, params);
        } else
        if (obj && obj instanceof Error) {
            // let stack = this.getStackframes();
            /*
            (<any> Error).prepareStackTrace = function(_, stack) {
                let caller = stack[3];
                caller = sourceMapSupport.wrapCallSite(caller);
                (<any> obj).file = caller.getFileName();
                (<any> obj).line = caller.getLineNumber();
                let func = caller.getFunctionName();
                if (func) {
                    (<any> obj).func = func;
                }
                return stack;
            };
            */
            return this.log.error(obj, format, params);
        } else
        if (obj && obj instanceof Buffer) {
            return this.log.error(obj, format, params);
        }

        this.log.error(obj, format, params);
    }

    public fatal(message: string): void {
        this.log.fatal(message);
    }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    /*
    private getStackframes() {
        if (this === undefined) {
            // Cannot access caller info in 'strict' mode.
            return;
        }
        let capture;

        (<any> Error).prepareStackTrace = function(e,t) {
            return t;
        };

        try {
            capture.error
        } catch (e) {
            capture = e.stack;
        }

        return capture;
    }
    */
}
