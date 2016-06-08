'use strict'

import * as config from "../admin/config";
var fs = require('fs');
var obj;
fs.readFile('./static/strings.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
});

var i18n = new config.I18N();

export default function help(bot, message) {
  bot.sendMessage(message.author, obj[i18n.language].commands, function(error, message) {
      if (error) {
        bot.reply(message, obj[i18n.language].helpKO);
      }
  });
  bot.reply(message, obj[i18n.language].helpOK);
}
