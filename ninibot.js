/**
** Here goes the magic
**/
'use strict'
var Discord = require("discord.js");
import * as login from "./src/admin/login"
import * as ping from "./src/command/ping"
import * as LOGGER from "./src/admin/log"



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
    var commandCalled = text.split(/\s/);
    if (commandCalled[0] === "!ping") {
      ping.ping(mybot, message);
    }
  }
});

/*var mentions = message.mentions;
for(var i = 0; i < mentions.length; i++) {
  let user = mentions[i];
  console.log(user.username);
  mybot.sendMessage(user, "test");
}*/
