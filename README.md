# NiniBot
Discord Bot with various features using [discord.js](https://github.com/hydrabolt/discord.js)

### Commands
!help : PM you a list of all available commands

!ping : will respond with a pong

!lang "language": niniBot will talk in "language" if strings are in strings.json (French and English are supported, but you can add any language you want)

!imgur -options "searchquery" : will return an image matching the query (options are top by day/Week/month/year/all time or viral)

!yt "searchquery" : will return a youtube video matching the query

!dice d(2/4/6/8/10/12/20/100) : will return the result of thrown dice. (shortcut !d(2/4/6/8/10/12/20/100))

!r34 "search query" : return an image from rule34xxx matching the query

#### Music
!music : ninibot will try to connect to a music channel (text and voice) so that commands will not flood other channels

!addMusic "searchquery" : will add to playlist, the corresponding youtube video

!skip : will skip current song 

### Authorization and Credentials
You'll need to set some credentials to use the API on which the bot rely. Thoses credentials are all put in ./src/admin/config.js :

1. process.env.NODE_IMGUR_CLIENT_ID is the clientID for the bot
2. process.env.NODE_GOOGLE_API_TOKEN is the google api token for the bot (without it, no youtube search !)
3. process.env.NODE_NINIBOT_LOGIN and process.env.NODE_NINIBOT_PWD are the bot credentials for discord.
