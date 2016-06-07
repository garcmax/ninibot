import * as LOGGER from "../admin/log"

var yt = require('youtube-node');
var youTube = new yt();


export function youTubeInit() {
    console.log(process.env.NODE_GOOGLE_API_TOKEN);
    youTube.setKey(process.env.NODE_GOOGLE_API_TOKEN);
}

export function youTubeSearch(bot, message) {
  bot.reply(message, 'search in progress...');
  LOGGER.LOG(`yt search query : ${message.content.substr(4)}`, message);
  youTube.search(message.content.substr(4), 1, function(error, result) {
    if (error) {
      console.log(error);
    }
    else {
      bot.reply(message, "http://www.youtube.com/watch?v=" + result.items[0].id.videoId);
    }
  });
}
