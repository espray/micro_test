import * as should from "should";
import { Ensure } from "../../../common";

describe("Ensure", () => {
    describe("IsNotFalsey", () => {
        it("should NOT error", () => {
            Ensure.IsNotFalsey({}, "test");
        });

        it("should error - undefined", () => {
            try {
                Ensure.IsNotFalsey(undefined, "test");
            } catch (err) {
                should(err).Object();
            }
        });

        it("should error - null", () => {
            try {
                Ensure.IsNotFalsey(undefined, "test");
            } catch (err) {
                should(err).Object();
            }
        });
    });

    describe("OneOrMore", () => {
        it("should NOT error", () => {
            Ensure.OneOrMore([{}], "test");
        });

        it("should error - undefined", () => {
            try {
                Ensure.OneOrMore(undefined, "test");
            } catch (err) {
                should(err).Object();
            }
        });

        it("should error - null", () => {
            try {
                Ensure.OneOrMore(null, "test");
            } catch (err) {
                should(err).Object();
            }
        });

        it("should error - zero", () => {
            try {
                Ensure.OneOrMore([], "test");
            } catch (err) {
                should(err).Object();
            }
        });
    });

    describe("ZeroOrMore", () => {
        it("should NOT error", () => {
            Ensure.ZeroOrMore([{}], "test");
        });

        it("should NOT error - zero", () => {
            Ensure.ZeroOrMore([], "test");
        });

        it("should error - undefined", () => {
            try {
                Ensure.ZeroOrMore(undefined, "test");
            } catch (err) {
                should(err).Object();
            }
        });

        it("should error - null", () => {
            try {
                Ensure.ZeroOrMore(null, "test");
            } catch (err) {
                should(err).Object();
            }
        });
    });

    describe("IsTrue", () => {
        it("should NOT error", () => {
            Ensure.IsTrue(true, "test");
        });

        it("should error - undefined", () => {
            try {
                Ensure.IsTrue(undefined, "test");
            } catch (err) {
                should(err).Object();
            }
        });

        it("should error - null", () => {
            try {
                Ensure.IsTrue(null, "test");
            } catch (err) {
                should(err).Object();
            }
        });

        it("should error - false", () => {
            try {
                Ensure.IsTrue(false, "test");
            } catch (err) {
                should(err).Object();
            }
        });

        it("should error - false - no message", () => {
            try {
                Ensure.IsTrue(false);
            } catch (err) {
                should(err).Object();
            }
        });
    });

    describe("IsFalse", () => {
        it("should NOT error", () => {
            Ensure.IsFalse(false, "test");
        });

        it("should error - undefined", () => {
            try {
                Ensure.IsFalse(undefined, "test");
            } catch (err) {
                should(err).Object();
            }
        });

        it("should error - null", () => {
            try {
                Ensure.IsFalse(null, "test");
            } catch (err) {
                should(err).Object();
            }
        });

        it("should error - true", () => {
            try {
                Ensure.IsFalse(true, "test");
            } catch (err) {
                should(err).Object();
            }
        });

        it("should error - true - no message", () => {
            try {
                Ensure.IsFalse(true);
            } catch (err) {
                should(err).Object();
            }
        });
    });
});
