var i18n = new config.I18N();

import * as LOGGER from "../admin/log"
import * as config from "../admin/config"

export function dice(bot, message, options) {
  let total = 0;
  for (let i = 1; i < options.length; i++) {
    let dice = options[i];
    if (/^d[2468]|10|20|100$/.test(dice)) {
      if (dice.length == 2) {
        return Math.floor(Math.random() * (dice[1] - 1 + 1) + 1);
      } else {
        return Math.random() * (dice[1] - 1 + 1) + 1;
      }
      return dice;
    }
  }
}
