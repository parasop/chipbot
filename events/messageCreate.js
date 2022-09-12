const { EmbedBuilder } = require("discord.js")


module.exports.run = async (client, message) => {
  if (
    message.author.bot ||
    !message.guild ||
    message.system ||
    message.webhookId
  )
    return;

  if (!message.content.startsWith(client.config.prefix)) return;

  if (!message.member) message.guild.fetchMembers(message);

  const args = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);

  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));
  const player = client.poru.players.get(message.guild.id);

  
  if (!command) return;

if(command.requirements && command.requirements.InVoiceChannel && !message.member.voice.channelId){

  let embed = new EmbedBuilder();
    
    embed.setAuthor({ name: `|  You aren't connected to a voice channel` , iconURL:message.author.displayAvatarURL()})

    embed.setColor(client.config.color)
return message.channel.send({ embeds: [embed] });

  
}
    if(command.requirements && command.requirements.InSameChannel && !message.member.voice.channelId !== message.guild.members.me.voice.channelId){

  let embed = new EmbedBuilder();
    
    embed.setAuthor({ name: `|  You aren't connected to the same voice channel as I am` , iconURL:message.author.displayAvatarURL()})

    embed.setColor(client.config.color)
return message.channel.send({ embeds: [embed] });

  
}

 if(command.requirements && command.requirements.InPlaying && !player){

  let embed = new EmbedBuilder();
    
    embed.setAuthor({ name: `| There's nothing playing in this server` , iconURL:message.author.displayAvatarURL()})

    embed.setColor(client.config.color)
return message.channel.send({ embeds: [embed] });

  
}

  
  if (command) command.run(client, message, args);
};