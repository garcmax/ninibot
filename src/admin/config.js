'use strict'

export var credentials = {
  "googleToken" : process.env.NODE_GOOGLE_API_TOKEN,
  "imgurId" : "Client-ID " + process.env.NODE_IMGUR_CLIENT_ID,
  "discordLogin" : process.env.NODE_NINIBOT_LOGIN,
  "discordPwd" : process.env.NODE_NINIBOT_PWD
}

let instance = null;

export class I18N {
  constructor() {
    if (!instance) {
      instance = this;
    }
    this.language = "en";
    return instance;
  }
}
