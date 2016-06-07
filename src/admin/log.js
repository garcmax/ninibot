export function LOG(log, message) {
  if (process.env.NODE_ENV == 'DEBUG') {
    if (message) {
      console.log(`${message.author.username}@${message.channel.name} ### ${log}`);
    } else {
      console.log(`technical log ### ${log}`);
    }
  }
}
