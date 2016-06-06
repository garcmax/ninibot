/**
** Here goes the magic
**/
'use strict'
var Discord = require("discord.js");
import * as login from "../src/admin/login"



var mybot = new Discord.Client();
login.login(mybot);
login.logout(mybot);

mybot.on("message", function(message) {
    if(message.content === "ping") {
        mybot.reply(message, "pong");
    }
});

mybot.on("message", function(message) {
    var mentions = message.mentions;
    for(var i = 0; i < mentions.length; i++) {
      let user = mentions[i];
      console.log(user.username);
      mybot.sendMessage(user, "test");
    }
})
