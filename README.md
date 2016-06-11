# NiniBot
Discord Bot with various features using [discord.js](https://github.com/hydrabolt/discord.js)

### Commands
!help : PM you a list of all available commands

!ping : will respond with a pong

!lang "language": niniBot will talk in "language" if strings are in strings.json (Only French and English are supported, but you can add any language you want)

!imgur "searchquery" : will return the top image matching the query

!yt "searchquery" : will return a youtube video matching the query

!update : update the bot to the last origin/master commit

### Authorization and Credentials
You'll need to set some credentials to use the API on which the bot rely. Thoses credentials are all put in ./src/admin/config.js :

1. process.env.NODE_IMGUR_CLIENT_ID is the clientID for the bot
2. process.env.NODE_GOOGLE_API_TOKEN is the google api token for the bot (without it, no youtube search !)
3. process.env.NODE_NINIBOT_LOGIN and process.env.NODE_NINIBOT_PWD are the bot credentials for discord.
