const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { Poru } = require('poru');
const client = new Client({
  failIfNotExists: true,
  allowedMentions: {
    parse: ['roles', 'users', 'everyone'],
    repliedUser: false,
  },
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.config = require('./config.json');
client.poru = new Poru(client, client.config.nodes, {
defaultPlatform:"ytsearch"
});
client.commands = new Collection();
client.aliases = new Collection();

['commands', 'events', 'poruEvents'].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

require('node:http')
  .createServer((_, res) =>
    res.end(
      `Developed by <b><a href="https://discord.com/users/4567704764813541376>Paras Braylon Astra Aryan/a></b> with ❤️`,
    ),
  )
  .listen(8080);

client.login(process.env.TOKEN);