const { EmbedBuilder } = require("discord.js")
const Topgg = require('@top-gg/sdk')

module.exports = {
  name: "checkvote",
  aliases: [],
  description: "",
  usage: "",
  example: "",
  userprems: [""],
  botperms: [""],
  run: async (client, message, args, player) => {

const chekkro = await client.topgg.hasVoted(message.author.id)

if(chekkro){
  
  let embed = new EmbedBuilder()
    
.setAuthor({ name: `| Voted: Thanks For Voting Me On TopGG , Use Premium Commands For Next 12h Free !` , iconURL:message.author.displayAvatarURL()})
.setColor(client.config.color)
return message.channel.send({ embeds: [embed] });
} else {
  let embedi = new EmbedBuilder()
   .setAuthor({ name: `| Not Voted: You have not voted me till yet on TopGG ! ` , iconURL:message.author.displayAvatarURL()})
.setColor(client.config.color)
  return message.channel.send({ embeds: [embedi] });
}

  }
}