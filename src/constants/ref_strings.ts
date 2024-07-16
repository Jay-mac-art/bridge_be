export class RefStrings {
  public static countryCode: String = "+91"

  // redis keys
  public static redisKeys: any = {
    verifyOTP: '_VERIFY_OTP_'
  };
  // provider
  public static provider: any = {
    twilio: "TWILIO"
  };
 
  public static status: any = {
   sent : "sent"
  };

  public static serviceAuthKey: any = {
    NFTM: process.env.NFTM,
    AdminConsole: process.env.AdminConsole,
    PAYMENT_ENGINE: process.env.PAYMENT_ENGINE,
    P2EWebsite: process.env.P2EWebsite,
    KalptantraWebsite: process.env.KalptantraWebsite,
    AUTH_ENGINE: process.env.AUTH_ENGINE,
  };

  public static OtpType: any = {
    verifyEmail: 'verifyEmail',
    resetPassword: 'resetPassword',
    changeMail: 'changeMail',
    enableTwoFA: 'enableTwoFA',
    login2FaOtp: 'login2FaOtp',
    verifyAdmin: 'verifyAdmin',
  };

  public static helperService: any = {
    emailService: 'EMAIL_SERVICE'
  }

  public static meta: any = {
    requestType: {
      post: 'POST',
      put: 'PUT',
      get: 'GET',
      patch: 'PATCH',
      delete : 'Delete'
    },
  };

  public static external: any = {
    emailUrl : 'https://emailapi.p2eppl.com/v1/send/email',
    smsUrl : 'https://dev-smsapi.p2eppl.com'
  }
  
}
