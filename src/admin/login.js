'use strict'

console.log(`${process.env.NODE_NINIBOT_LOGIN}:${process.env.NODE_NINIBOT_PWD}`)

export function login(bot) {
  bot.login(process.env.NODE_NINIBOT_LOGIN, process.env.NODE_NINIBOT_PWD, function(error, token) {
    if (error){
        console.log(error);
    } else {
        console.log("successfully connected");
    }
  });
}

export function logout(bot) {
  bot.on("message", function(message) {
    if(message.content === "!deco") {
        bot.logout(function(error) {
          if (error){
              console.log(error);
          } else {
              console.log("successfully disconnected");
          }
        });
    }
  });
}
