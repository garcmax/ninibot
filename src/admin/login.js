'use strict'
import {multimediaInit} from '../command/multimedia';
import * as LOGGER from "./log"
import * as Config from "./config"

export function login(bot) {
  console.log(Config.credentials);
  bot.login(Config.credentials.discordLogin, Config.credentials.discordPwd, function(error, token) {
    if (error){
        LOGGER.LOG(error);
    } else {
        LOGGER.LOG(`successfully connected with ${token}`);
    }
  });
}

export function logout(bot) {
  bot.logout(function(error) {
    if (error){
        LOGGER.LOG(error);
    } else {
        LOGGER.LOG("successfully disconnected");
    }
  });
}
