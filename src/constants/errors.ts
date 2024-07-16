export class Errors {

    public static errorMessage(message: string, httpStatus: number, customErrorNumber: number) {
        return {
            message: message,
            httpStatus: httpStatus,
            customErrorNumber: customErrorNumber,
        }
    }

    public static systemError: any = {
        timestamp: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        message: "Not Found",
        httpStatus: 404,
        customErrorNumber: -1000000,
        invalidRequestFormat: Errors.errorMessage("Invalid Request Format", 400, -999999),
        invalidRequest: Errors.errorMessage("Invalid Request", 401, 0),
        oopsSomethingWentWrong: Errors.errorMessage("Oops! Something went wrong", 500, -1),
        externalProviderIssue: Errors.errorMessage("Please try in some time!", 401, -2),
    } // -1000000 to 99999

    public static externalErrors: any = {
        // External
        smsError: Errors.errorMessage("Error Sending in Sms", 400, 200001),
    }
    //10001 to 10100
    public static bridgeErrors : any = {
        chainParamsRequired : Errors.errorMessage("Chain parameter is required", 400, 10001)
    


    } 


}