var parser = require('xml2json');
var request = require('request');
var i18n = new config.I18N();

import * as LOGGER from "../admin/log"
import * as config from "../admin/config"

export function r34(bot, message) {
    let query = encodeURIComponent(message.content.substr(5));
    let options = {
      url: "http://rule34.xxx/index.php?page=dapi&s=post&q=index&limit=1&tags=" + query
    };
    request(options, function(error, response, body) {
      if (error) {
        LOGGER.LOG(error, message);
      } else {
        let suffix = buildSuffix(body);
        if (suffix == 1) {
          bot.reply(message, config.strings[i18n.language].r34KO);
        } else {
          bot.reply(message, "http:" + suffix);
        }
      }
    });
}

export function buildSuffix(body) {
  let json = parser.toJson(body);
  let jsonParsed = JSON.parse(json);
  let suffix = jsonParsed.posts.post;
  if (suffix) {
    return suffix.file_url ? suffix.file_url : 1;
  }
  return 1;
}
