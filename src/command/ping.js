'use strict'

export function ping(bot, message) {
  bot.reply(message, "pong");
}

export function notif(bot, message) {
  var mentions = message.mentions;
  console.log(`${message.channel} : ${message}`);
  for(var i = 0; i < mentions.length; i++) {
    let user = mentions[i];
    console.log(user.username);
    bot.sendMessage(user, `Hello ${user.username}, ${message.author.username} has notified you in this message : "${message.content}"`);
  }
}
