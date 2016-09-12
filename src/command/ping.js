'use strict';

import * as LOGGER from "../admin/log";

export function ping(bot, message) {
  message.channel.sendMessage('pong!')
 .then(message => console.log(`Sent message: ${message.content}`))
 .catch(console.log);
}

export function notif(bot, message) {
  var mentions = message.mentions;
  for(var i = 0; i < mentions.length; i++) {
    let user = mentions.users[i];
    LOGGER.LOG(`username to send pm : ${user.username}`, message);
    LOGGER.LOG(`status of user : ${user.status}`, message);
    if (user.status != 'online') {
      message.channel.sendMessage(`Hello ${user.username}, ${message.author.username} has notified you in this message : "${message.content}"`)
      .then(message => console.log(`Sent message: ${message.content}`))
      .catch(console.log);
      //bot.sendMessage(user, `Hello ${user.username}, ${message.author.username} has notified you in this message : "${message.content}"`);
    }    
  }
}
