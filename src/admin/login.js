'use strict';
import {multimediaInit} from '../command/multimedia';
import * as LOGGER from "./log";
import * as Config from "./config";

export function login(bot) {
  console.log(Config.credentials);
  console.log(process.env.NODE_ENV);  
  bot.login(Config.credentials.discordToken);
}


export function logout(bot) {
  bot.destroy().then(error => {    
    if (error){
        LOGGER.LOG(error);
    } else {
        LOGGER.LOG("successfully disconnected");
    }
  });
}
