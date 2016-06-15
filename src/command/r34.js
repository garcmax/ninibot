var parser = require('xml2json');
var request = require('request');
var i18n = new config.I18N();

import * as LOGGER from "../admin/log"
import * as config from "../admin/config"

export function r34(bot, message) {
    let query = encodeURIComponent(message.content.substr(5));
    let options = {
      url: "http://rule34.xxx/index.php?page=dapi&s=post&q=index&limit=10&tags=" + query
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
  let json = parser.toJson(body, {arrayNotation: true});
  let jsonParsed = JSON.parse(json);
  let posts = jsonParsed.posts[0];
  if(posts.post) {
    let post = posts.post;
    for (let i = 0; i < post.length; i++) {
      let filename = post[i].file_url;
      if (/\.jpeg$|\.jpg$|\.gif$|\.png$/.test(filename)) {
        return filename;
      }
    }
  }
  return 1;
}
