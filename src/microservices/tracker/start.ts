import { FunctionRequest, HttpContext, HttpStatusCodes } from "azure-functions";

export default (context: HttpContext, req: FunctionRequest) => {
    context.res.status = HttpStatusCodes.OK;

    context.done();
};
