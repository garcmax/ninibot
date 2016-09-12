'use strict';
import {multimediaInit} from '../command/multimedia';
import * as LOGGER from "./log";
import * as Config from "./config";

export function login(bot) {
  console.log(Config.credentials);
  console.log(process.env.NODE_ENV);  
  bot.login(Config.credentials.discordToken, function (error) {
    if (error){
        LOGGER.LOG(error);
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
