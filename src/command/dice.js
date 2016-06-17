var random = require("random-js");
var i18n = new config.I18N();

import * as LOGGER from "../admin/log"
import * as config from "../admin/config"


export function dice(bot, message, options) {
  let total = 0;
  let engine = random.engines.mt19937().autoSeed();
  for (let i = 1; i < options.length; i++) {
    let dice = options[i];
    if (/^d[2468]|10|20|100$/.test(dice)) {
      if (dice.length == 2) {
        let distribution = random.integer(1,6);
        let result = distribution(engine);
        return result;
      } else if (dice.length == 3) {

      } else if (dice.length == 4) {
        let distribution = random.integer(1,100);
        let result = distribution(engine);
        return result;
      }
      return dice;
    }
  }
}
