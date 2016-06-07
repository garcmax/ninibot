/**
** Here goes the magic
**/
'use strict'
var Discord = require("discord.js");
import * as login from "./src/admin/login"
import * as ping from "./src/command/ping"
import * as LOGGER from "./src/admin/log"
import {youTubeSearch, imgurSearch} from "./src/command/multimedia"



var mybot = new Discord.Client();

login.login(mybot);
login.logout(mybot);

mybot.on("message", function(message) {
  var text = message.content;
  LOGGER.LOG(text, message);
  if (message.author.id != mybot.user.id) {
    ping.notif(mybot, message);
  }
  if (/^!\w*/.test(text)) {
    let commandCalled = text.split(/\s/);
    let command = commandCalled[0];
    if (command === "!ping") {
      ping.ping(mybot, message);
    } else if (command === "!yt") {
      youTubeSearch(mybot, message);
    } else if (command === "!imgur") {
      imgurSearch(mybot, message);
    }
  }
});
