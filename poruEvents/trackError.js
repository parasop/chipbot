const discord = require("discord.js")
const ms = require("ms")
module.exports.run = async (client,player,track,error) => {

  let embed = new discord.EmbedBuilder()
  .setTitle(`${error.exception.message}`)
  .setDescription(`[${track.info.title}](${track.info.uri})`)

  return player.textChannel.send({embeds:[embed]})

    }