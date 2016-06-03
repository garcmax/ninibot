/**
** Here goes the magic
**/
'use strict'
var Discord = require("discord.js");

var mybot = new Discord.Client();

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

mybot.login("ninibot.discord@gmail.com", "Payre0123");

mybot.on("message", function(message) {
  if(message.content === "!ninibot meurt") {
      mybot.logout(function(error) {
        if (error){
            console.log(error);
        } else {
            console.log("successfully disconnected");
        }
      });
  }
});
// If you still need to login with email and password, use mybot.login("email", "password");
