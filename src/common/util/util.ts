
export function describerGetName(inputClass) {
    let funcNameRegex = /function (.{1,})\(/;
    let results = (funcNameRegex).exec((<any> inputClass).constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
};

/** No Operation */
export function noop() { ; };
