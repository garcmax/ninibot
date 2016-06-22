'use strict'
var fs = require('fs');

export function music(bot, message) {
  console.log(message.channel.server.channels[1]);
  bot.joinVoiceChannel(message.channel.server.channels[1], function (error) {
    if (error) {
      console.log(error);
      return -1;
    }
    console.log("SUCCESS");
    let url = message.content.substr(7)
    console.log(url);
    bot.playFile("./test.mp3", { volume: 0.5 }, function (error, streamIntent) {
      streamIntent.on("error", function (error) {
          console.log("error " + error);
      });
      streamIntent.on("time", function (time) {
          console.log("time " + time);
      });
      streamIntent.on("end", function () {
          console.log("end");
      });
    });
  });
}
