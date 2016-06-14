var parser = require('xml2json');
var request = require('request');

import * as LOGGER from "../admin/log"

export function r34(bot, message) {
    let query = message.content.substr(5);
    console.log(query);
    let options = {
      url: "http://rule34.xxx/index.php?page=dapi&s=post&q=index&limit=1&tags=" + query
    };
    request(options, function(error, response, body) {
      if (error) {
        LOGGER.LOG(error, message);
      } else {
        let json = parser.toJson(body);
        bot.reply(message, "http:" + JSON.parse(json).posts.post.file_url);
      }
    });
}
