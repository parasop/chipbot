const { EmbedBuilder } = require("discord.js") 
const {prefix} = require("../../config.json");
module.exports = {
  name: "forceskip",
  requirements:{
    InVoiceChannel:true,
    InsameVoiceChannel:true,
    Isplaying :false
  },
  description:"Skip to the next track in queue without starting a vote with other listeners.",
  permissions:{
    user: `Having a role named "DJ" or Manage Messages permissions or being alone with the bot.`
  },
  usage:"${prefix}forceskip",
  example:`${prefix}forceskip`,
run: async (client,message,args) => {


let player = client.poru.get(message.guild.id)


return player.stop();


}}