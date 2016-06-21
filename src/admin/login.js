'use strict'
import {multimediaInit} from '../command/multimedia';
import * as LOGGER from "./log"
import * as Config from "./config"

export function login(bot) {
  console.log(Config.credentials);
  //bot.login(Config.credentials.discordLogin, Config.credentials.discordPwd, function(error, token) {
  bot.loginWithToken("MTkwNDEyNzMzNTI5NzE4Nzg0.CksqVA.pKOKW0_kEcZb_Ra4NMNGL_BMcw8", function (error) {
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
