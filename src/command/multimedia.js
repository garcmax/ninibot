import * as LOGGER from "../admin/log"
import * as config from "../admin/config"
var i18n = new config.I18N();

var request = require('request');

export function buildQuery(opts) {
  let sort = "";
  let windw = "";
  let query = "&query=";
  let optIndex = 1;
  if (opts[1] && opts[1].charAt(0) === "-") {
    optIndex++;
    let opt1 = opts[1].substr(1);
      if (opt1 === "top") {
        sort = "&sort=top";
        if (opts[2] && opts[2].charAt(0) === "-") {
          optIndex++
          let opt2 = opts[2].substr(1);
          if (opt2 === "day") {
            windw = "&window=day";
          } else if (opt2 === "week") {
            windw = "&window=week";
          } else if (opt2 === "month") {
            windw = "&window=month";
          } else if (opt2 === "year") {
            windw = "&window=year";
          } else {
            return "bad window"
          }
        }
      } else if (opt1 === "viral") {
        sort = "&sort=viral";
      } else {
        return "bad opt";
      }
  }  
  while (optIndex < opts.length) {
    query = query + opts[optIndex] + " ";
    optIndex++;
  }
  return sort + windw + query;
}

export function imgurSearch(bot, message, opts) {
  let urlSearch = "https://api.imgur.com/3/gallery/search/?q=";
  let query = buildQuery(opts);

  return 0;

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
  };sdfsf
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
