const { EmbedBuilder } = require("discord.js") 
const {prefix} = require("../../config.json");
module.exports = {
  name: "clear",
  requirements:{
    InVoiceChannel:true,
    InsameVoiceChannel:true,
    Isplaying :false
  },
  description:"Remove all tracks from the queue at once.",
  permissions:{
    user: `Having a role named "DJ" or Manage Messages permissions or being alone with the bot.`
  },
  usage:`${prefix}clear`,
  example:`${prefix}clear`,
run: async (client,message,args) => {


let player = client.poru.get(message.guild.id)


  player.queue.clear();


  let embed = new EmbedBuilder()
                .setColor(client.config.color)
              embed.setAuthor({ name: `|  Removed every track from the queue` , iconURL:message.author.displayAvatarURL()})
           embed.setColor(client.config.color)
             
             return message.channel.send({ embeds: [embed]})
  






}}










