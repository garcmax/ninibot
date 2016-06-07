'use strict'
import {multimediaInit} from '../command/multimedia';
import * as LOGGER from "./log"

export function login(bot) {
  bot.login(process.env.NODE_NINIBOT_LOGIN, process.env.NODE_NINIBOT_PWD, function(error, token) {
    if (error){
        LOGGER.LOG(error);
    } else {
        LOGGER.LOG("successfully connected");
        multimediaInit();
    }
  });
}

export function logout(bot) {
  bot.on("message", function(message) {
    if(message.content === "!deco") {
        bot.logout(function(error) {
          if (error){
              LOGGER.LOG(error);
          } else {
              LOGGER.LOG("successfully disconnected");
          }
        });
    }
  });
}
