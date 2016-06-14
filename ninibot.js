/**
** Here goes the magic
**/
'use strict'
var Discord = require("discord.js");
import * as login from "./src/admin/login"
import * as ping from "./src/command/ping"
import help from "./src/command/help"
import * as setting from "./src/command/settings"
import * as LOGGER from "./src/admin/log"
import {youTubeSearch, imgurSearch} from "./src/command/multimedia"
import {r34} from "./src/command/r34"

var mybot = new Discord.Client();

login.login(mybot);

mybot.on("message", function(message) {
  var text = message.content;
  LOGGER.LOG(text, message);


  if (!message.author.equals(mybot.user)) {
    ping.notif(mybot, message);
    if (/^!\w{2,6}.*$/.test(text)) {
      let options = text.split(/\s/);
      let command = options[0];
      LOGGER.LOG(`command: ${command}`, message);
      if (command === "!ping") {
        ping.ping(mybot, message);
      } else if (command === "!deco" && process.env.NODE_ENV == 'DEBUG') {
        login.logout(mybot);
      } else if (command === "!help") {
        help(mybot, message, false);
      } else if (command === "!lang") {
        setting.changeLanguage(mybot, message);
      } else if (command === "!avatar") {
        setting.changeAvatar(mybot, message);
      } else if (command === "!yt") {
        youTubeSearch(mybot, message);
      } else if (command === "!imgur") {
        imgurSearch(mybot, message, options);
      } else if (command === "!r34") {
        r34(mybot, message);
      } else {
        help(mybot, message, true);
      }
    }
  }

});
