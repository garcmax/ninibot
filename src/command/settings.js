'use strict';

var request = require('request');

import * as LOGGER from "../admin/log";
import * as config from "../admin/config";
var i18n = new config.I18N();

export function changeLanguage(bot, message) {
  let newLang = message.content.substr(6);
  if (config.strings[newLang]) {
    i18n.language = newLang;
    bot.sendMessage(message, config.strings[i18n.language].i18nOK, function(error, message) {
      if (error) {
        bot.reply(message, config.strings[i18n.language].i18nKO);
      }
    });
  } else {
    bot.reply(message, config.strings[i18n.language].i18nKO);
  }
}

/*export function changeName(bot, message) {
  let name = message.content.split(/\s/)[1];
  bot.setUsername(name, function(error) {
    if (error) {
      console.log(error);
      bot.reply(message, "error");
    } else {
      bot.reply(message, "name changed");
    }
  });
}*/


export function changeAvatar(bot, message) {
  let query = message.content.split(/\s/)[1];
  let options = {
    url: query
  };
  request(options, function(error, response, body) {
    if (error || response.statusCode != 200) {
      LOGGER.LOG(error, message);
    } else {
      let buffer = new Buffer(body).toString('base64');
      console.log(buffer);
      bot.setAvatar(buffer, function(error) {
        if (error) {
          console.log(error);
          bot.reply(message, config.strings[i18n.language].avatarKO);
        } else {
          bot.reply(message, config.strings[i18n.language].avatarOK);
        }
      });
    }
  });
}
