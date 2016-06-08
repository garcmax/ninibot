'use strict'
var fs = require('fs');
var obj;
fs.readFile('./static/commands.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
});


export default function help(bot, message) {
  bot.sendMessage(message.author, obj.commands, function(error, message) {
      if (error) {
        bot.reply(message, "sorry but i couldn't give me all the help you needed, please forgive me.");
      }
  });
  bot.reply(message, "i just send you all the help you need by PM.");
}
