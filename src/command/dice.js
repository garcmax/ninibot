'use strict';

var random = require("random-js");
import * as LOGGER from "../admin/log";
import * as config from "../admin/config";
var i18n = new config.I18N();

export function throwDice(options) {
  let total = 0;
  let engine = random.engines.mt19937().autoSeed();
  let dice = options[options.length - 1];
  if (/^(!d|d)([2468]|10|12|20|100)$/.test(dice)) {
    let number = dice[0] === "!" ? dice.substr(2) : dice.substr(1);
    let distribution = random.integer(1,number);
    let result = distribution(engine);
    return result;
  }
  return -1;
}

export function dice(bot, message, options) {
  let result = throwDice(options);
  if (result != -1) {
    message.channel.sendMessage(result)
        .then(message => console.log(`Sent message: ${message.content}`))
        .catch(console.log);        
  } else {
    message.channel.sendMessage(config.strings[i18n.language].diceKO)
        .then(message => console.log(`Sent message: ${message.content}`))
        .catch(console.log);        
  }
  return 1;
}
