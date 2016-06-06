/**
** Here goes the magic
**/
'use strict'
var Discord = require("discord.js");
import * as login from "./src/admin/login"
import * as ping from "./src/command/ping"



var mybot = new Discord.Client();

login.login(mybot);
login.logout(mybot);

mybot.on("message", function(message) {
  var text = message.content;
  console.log(text);
  if (message.author != mybot.user && /^!\w*/.test(text)) {
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
