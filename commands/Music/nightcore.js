const { EmbedBuilder } = require("discord.js")

module.exports = {
  name: "nightcore",
  aliases: [],
  description: "",
  usage: "",
  example: "",
  userprems: [""],
  botperms: [""],
    requirements:{
    InVoiceChannel:true,
    InsameVoiceChannel:true,
    Isplaying :true
  },
  run: async (client, message, args, player) => {
player.filters.setNightcore(true)


  }
}
