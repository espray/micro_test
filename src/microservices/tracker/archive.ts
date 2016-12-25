// import { FunctionRequest, HttpContext, HttpStatusCodes } from "azure-functions";

export default (context: azureFunctions.HttpContext, req: azureFunctions.FunctionRequest) => {
    context.res.status = azureFunctions.HttpStatusCodes.OK;
    context.log("Test");
    context.done();
};
