const { EmbedBuilder } = require("discord.js")


module.exports = {
  name: "ping",
  run: async (client,message) => {

    let embed = new EmbedBuilder();
    
    embed.setAuthor({ name: `| Pong: ${client.ws.ping}ms` , iconURL:message.author.displayAvatarURL()})

    embed.setColor(client.config.color)
return message.channel.send({ embeds: [embed] });
  }
}
