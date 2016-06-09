import * as LOGGER from "../admin/log"
import * as config from "../admin/config"
var i18n = new config.I18N();

var request = require('request');

export function imgurSearch(bot, message) {
  let query = encodeUrl(message.content.substr(6));
  let options = {
    url: "https://api.imgur.com/3/gallery/search/?q=" + query,
    headers: {
      'Authorization' : config.credentials.imgurId
    }
  };
  request(options, function(error, response, body) {
    if (error) {
      LOGGER.LOG(error, message);
    } else {
      LOGGER.LOG(body, message);
      let res = JSON.parse(body);
      let data = res.data ? res.data[0] : undefined;
      if(response.statusCode === 200 && data) {
        bot.reply(message, data.link);
      } else if (response.statusCode === 200 && !data) {
        bot.reply(message, config.strings[i18n.language].multimediaSearchKO);
      } else {
        bot.reply(message, config.strings[i18n.language].queryKO);
      }
    }
  });
}

export function youTubeSearch(bot, message) {
  let query = encodeUrl(message.content.substr(4));
  let options = {
    url: "https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&order=relevance&type=video&q=" + query + "&key=" + config.credentials.googleToken,
  };
  request(options, function(error, response, body) {
    if (error) {
      LOGGER.LOG(error, message);
    } else {
      LOGGER.LOG(body, message);
      let res = JSON.parse(body);
      let data = res.items ? res.items[0] : undefined;
      if(response.statusCode === 200 && data) {
        bot.reply(message, "http://www.youtube.com/watch?v=" + data.id.videoId);
      } else if (response.statusCode === 200 && !data) {
        bot.reply(message, config.strings[i18n.language].multimediaSearchKO);
      } else {
        bot.reply(message, config.strings[i18n.language].queryKO);
      }
    }
  });
}

function encodeUrl(str) {
    return encodeURIComponent(str).replace(/%20/gi, '+');
}
