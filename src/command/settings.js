'use strict'

import * as config from "../admin/config";
var i18n = new config.I18N();

export function changeLanguage(bot, message) {
  i18n.language = message.content.substr(6);

  bot.sendMessage(message, config.strings[i18n.language].i18nOK, function(error, message) {
      if (error) {
        bot.reply(message, config.strings[i18n.language].i18nKO);
      }
  });
}
