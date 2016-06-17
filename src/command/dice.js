var random = require("random-js");
var i18n = new config.I18N();

import * as LOGGER from "../admin/log"
import * as config from "../admin/config"

export function throwDice(options) {
  let total = 0;
  let engine = random.engines.mt19937().autoSeed();
  let dice = options[1];
  if (/^d[2468]|10|12|20|100$/.test(dice)) {
    let number = dice.substr(1);
    let distribution = random.integer(1,number);
    let result = distribution(engine);
    return result;
  }
  return 1;
}

export function dice(bot, message, options) {
  let result = throwDice(options);
  if (result != 1) {
    bot.sendMessage(message.channel, result, function (error) {
      if (error) {
        LOGGER.LOG(error, message)
      }
    });
  } else {
    bot.sendMessage(message.channel, config.strings[i18n.language].diceKO, function (error) {
      if (error) {
        LOGGER.LOG(error, message)
      }
    });
  }
  return 1;
}
