import * as util from "../util/util";

function captureStackTrace(targetObject, constructorOpt) {
    if (Error.captureStackTrace) {
        Error.captureStackTrace(targetObject, constructorOpt);
    }
}

export namespace Errors {
    /**
     * The error that is thrown when one of the arguments provided to a method is not valid.
     */
    export class ArgumentError extends Error {
        constructor(public argumentName: string, message?: string) {
            super(message);
            captureStackTrace(this, this.constructor);
            this.name = util.describerGetName(this);
            this.argumentName = argumentName;
            this.message = message ||
                "Invalid or missing argument supplied" + ( argumentName ? ": {argumentName}" : ".");
        }
    }

    /**
     * The error that is thrown when a null reference is passed to a method that does not accept it as a valid argument.
     */
    export class ArgumentNullError extends Error {
        constructor(public argumentName: string, message?: string) {
            super(message);
            captureStackTrace(this, this.constructor);
            this.name = util.describerGetName(this);
            this.argumentName = argumentName;
            this.message = message ||
                "Missing argument" + ( argumentName ? ": {argumentName}" : ".");
        }
    }

    /**
     * The error that is thrown when the time allotted for a process or operation has expired.
     */
    export class TimeoutError extends Error {
        constructor(message?: string) {
            super(message);
            captureStackTrace(this, this.constructor);
            this.name = util.describerGetName(this);
            this.message = message;
        }
    }

    /**
     * The error that is thrown when a requested method or operation is not implemented.
     */
    export class NotImplementedError extends Error {
        constructor(message?: string) {
            super(message);
            captureStackTrace(this, this.constructor);
            this.name = util.describerGetName(this);
            this.message = message;
        }
    }
}

/**
 *  Represents methods that can be used to ensure that parameter values meet expected conditions.
 */
export namespace Ensure {
    /**
     *  Ensures that the value of a parameter is not falsey;
     *  Otherwise throw an ArgumentNullError.
     */
    export function IsNotFalsey<T>(value: T, argumentName?: string): T {
        if (!value) {
            throw new Errors.ArgumentNullError(argumentName,
                "Value cannot be falsey" + ( argumentName ? ": {argumentName}" : "."));
        }

        return value;
    }

    /** 
     *  Ensures that the value of a parameter has 1 (one) or more elements in the collection;
     *  Otherwise throw an Error. 
     */
    export function OneOrMore<T>(value: T[], argumentName?: string): T[] {
        IsNotFalsey(value, argumentName);

        if (!value.length) {
            throw new Error("Value must contain 1 (one) or more items." + (argumentName ? ": {argumentName}" : ""));
        }

        return value;
    }

    /** 
     *  Ensures that the value of a parameter has 0 (zero) or more elements in the collection;
     *  Otherwise throw an Error. 
     */
    export function ZeroOrMore<T>(value: T[], argumentName?: string): T[] {
        if (value === undefined || value === null) {
            throw new Error("Value cannot be falsey." + (argumentName ? " argumentName:" + argumentName : ""));
        }

        return value;
    }

    /** 
     *  Ensures that the value is True;
     *  Otherwise throw an Error. 
     */
    export function IsTrue(value: boolean, message?: string) {
        if (value === undefined || value === null) {
            throw new Error("Value cannot be falsey.");
        }

        if (value === false) {
            throw new Error("Value cannot be false." + (message ? " " + message : ""));
        }
    }

    /** 
     *  Ensures that the value is False;
     *  Otherwise throw an Error. 
     */
    export function IsFalse(value: boolean, message?: string) {
        if (value === undefined || value === null) {
            throw new Error("Value cannot be falsey.");
        }

        if (value === true) {
            throw new Error("Value cannot be true." + (message ? " " + message : ""));
        }
    }
}
