const exec = require('child_process').exec;

export default function update(bot, message) {
  exec('/home/maxou/workspace/ninibot/src/admin/./update.sh', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    bot.reply(message, "stdout: "+ stdout);
    console.log(`stdout: ${stdout}`);
    return;
  });
}
