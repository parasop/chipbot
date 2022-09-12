const {ButtonStyle} = require("discord.js")
const discord = require("discord.js")
const ms = require("pretty-ms")
module.exports.run = async (client,player,track,data) => {
  console.log(data)
let tr = track.info.title;
  let result = tr.substring(0, 64);
  
const row = new discord.ActionRowBuilder().addComponents([
  new discord.ButtonBuilder()
  .setStyle( ButtonStyle.Success)
  .setLabel(`Pause & Resume`)
  .setCustomId(`pause`),
    new discord.ButtonBuilder()
  .setStyle( ButtonStyle.Primary)
  .setLabel(`Skip`)
  .setCustomId(`skip`),
    new discord.ButtonBuilder()
  .setStyle( ButtonStyle.Danger)
  .setLabel(`Stop`)
  .setCustomId(`stop`),
    new discord.ButtonBuilder()
  .setStyle( ButtonStyle.Secondary)
  .setLabel(`Show Queue`)
  .setCustomId(`queue`)


])

  let length = ms(track.info.length, {colonNotation: true});
  const embed = new discord.EmbedBuilder()
  
    .setAuthor({name:`|  Now playing`,iconURL: track.info.requester.displayAvatarURL()})
      .setColor(client.config.color) 
  .setDescription(`[${result}](${track.info.uri})  by  [${track.info.author}](${client.config.support})  [${length}]`)


  let channel = client.guilds.cache.get(player.guildId).channels.cache.get(player.textChannel);

  console.log(channel)
return channel.send({ embeds: [embed],components:[row]}).then(x => player.message = x)

}