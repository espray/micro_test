import * as should from "should";
import * as archive from "../../../microservices/tracker/archive";

describe("archive", () => {
    describe("'OK' result", () => {
        it("should NOT error", () => {
            archive.default(<any> {res: {}, log: (string) => { ; }, done: () => { ; }}, <any> {});
        });
    });
});
