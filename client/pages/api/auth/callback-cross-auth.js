import auth0 from "auth0-js"

var auth0Client = new auth0.WebAuth({
  clientID: "Beoeje44BADvLSMy2WWtru9xmobQupDc",
  domain: "dev-umi0r30bdxg5tior.us.auth0.com",
})
auth0Client.crossOriginVerification()
