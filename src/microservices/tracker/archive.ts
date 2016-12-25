import { Azure } from "../../common";

export default (context: Azure.Functions.HttpContext, req: Azure.Functions.FunctionRequest) => {
    context.res.status = Azure.Functions.HttpStatusCodes.OK;
    context.log("Test");
    context.done();
};
