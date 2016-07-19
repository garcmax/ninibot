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
import {dice} from "./src/command/dice"
import * as dj from "./src/command/music"

var mybot = new Discord.Client();

login.login(mybot);


mybot.on("message", function (message) {
  var text = message.content;
  LOGGER.LOG(text, message);


  if (!message.author.equals(mybot.user)) {
    ping.notif(mybot, message);
    if (/^!\w{2,10}.*$/.test(text)) {
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
      } else if (command === "!music") {
        dj.music(mybot, message);
      } else if (command === "!add" && message.channel.equals(dj.getTextMusicChannel())) {
        dj.addMusic(mybot, message);
      } else if (command === "!reset" && message.channel.equals(dj.getTextMusicChannel()) && hasDjRole(mybot, message)) {
        dj.resetMusic(mybot, message);
      } else if (command === "!del" && message.channel.equals(dj.getTextMusicChannel()) && hasDjRole(mybot, message)) {
        dj.deleteMusic(mybot, message);
      } else if (/^!d\w{2,4}/.test(command)) {
        dice(mybot, message, options);
      } else {
        help(mybot, message, true);
      }
    }
  }

});

function hasDjRole(bot, message) {
  let roles = message.channel.server.roles;
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].hasPermission("kickMembers")) {
      console.log(roles[i].name);
      if (bot.memberHasRole(message.author, roles[i])) {
        console.log("hasDjRole");
        return true;
      }
    }
  }
  console.log("hasNotDjRole");
  return false;
}