'use strict';
var fs = require('fs');

export var credentials = {
  "googleToken" : process.env.NODE_GOOGLE_API_TOKEN,
  "imgurId" : "Client-ID " + process.env.NODE_IMGUR_CLIENT_ID,
  "discordLogin" : process.env.NODE_NINIBOT_LOGIN,
  "discordPwd" : process.env.NODE_NINIBOT_PWD,
  "discordToken" : process.env.NODE_NINIBOT_TOKEN
};

export var strings;
fs.readFile('./static/strings.json', 'utf8', function (err, data) {
    if (err) throw err;
    strings = JSON.parse(data);
});

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