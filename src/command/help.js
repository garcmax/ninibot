'use strict'

import * as config from "../admin/config";

var i18n = new config.I18N();

export default function help(bot, message) {
  bot.sendMessage(message.author, config.strings[i18n.language].commands, function(error, message) {
      if (error) {
        bot.reply(message, config.strings[i18n.language].helpKO);
      }
  });
  bot.reply(message, config.strings[i18n.language].helpOK);
}
