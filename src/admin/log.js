export function LOG(log, message) {
  if (process.env.NODE_ENV == 'DEBUG') {
    console.log(`${message.author.username}@${message.channel.name}@${message.channel.server.name} ### ${log}`);
  }
}
