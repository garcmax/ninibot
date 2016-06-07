'use strict'
import {youTubeInit} from '../command/multimedia';

export function login(bot) {
  bot.login(process.env.NODE_NINIBOT_LOGIN, process.env.NODE_NINIBOT_PWD, function(error, token) {
    if (error){
        console.log(error);
    } else {
        console.log("successfully connected");
        youTubeInit();
    }
  });
}

export function logout(bot) {
  bot.on("message", function(message) {
    if(message.content === "!deco") {
        bot.logout(function(error) {
          if (error){
              console.log(error);
          } else {
              console.log("successfully disconnected");
          }
        });
    }
  });
}
