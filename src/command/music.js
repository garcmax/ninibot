'use strict'

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
    bot.playFile("https://archive.org/download/testmp3testfile/mpthreetest.mp3", function (error) {
      if (error) {
        console.log(error);
        return -1
      }
      console.log("PLAYING FILE");
    });
  });
}
