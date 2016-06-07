# NiniBot
Discord Bot with various features using [discord.js](https://github.com/hydrabolt/discord.js)

### Commands
!ping : will respond with a pong
!imgur <searchquery> : will return the top image matching the query
!yt <search query> : will return a youtube video matching the query

### Authorization and Credentials
You'll need to set some credentials to use imgur and youtube :
1. process.env.NODE_IMGUR_CLIENT_ID is the clientID for the bot
2. process.env.NODE_GOOGLE_API_TOKEN is the google api token for the bot (without it, no youtube search !)
3. process.env.NODE_NINIBOT_LOGIN and process.env.NODE_NINIBOT_PWD are the bot credentials for discord.
