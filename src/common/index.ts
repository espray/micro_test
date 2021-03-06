import * as Azure from "./azure/azure";
import { Config } from "./configuration/config";
import { ApplicationLogger } from "./diagnostics/logger";
import { Ensure, Errors } from "./errors/errors";
import { Constants } from "./util/constants";
import * as util from "./util/util";

let Logger = {
    Application: ApplicationLogger.Instance,
};

export {
    Azure,
    Config,
    Constants,
    Ensure,
    Errors,
    Logger,
    util
};
