const { EmbedBuilder } = require("discord.js")

module.exports = {
  name: "invite",
  aliases: [],
  description: "stuff",
  usage: "",
  example: "",
  userprems: [""],
  botperms: [""],
  run: async (client, message, args, player) => {

    let embed = new EmbedBuilder();

    embed.setColor(client.config.color)
    embed.setAuthor({ name: `|  Invite Melody`, iconURL: message.author.displayAvatarURL() })
    embed.setDescription(`[Invite Melody](https://melodybot.me/invite) | [Invite Melody 2](https://melodybot.me/invite) | [Invite Melody 3](https://melodybot.me/invite)`)
    message.channel.send({ embeds: [embed] })
  }
}