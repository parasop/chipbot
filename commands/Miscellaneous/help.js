const { EmbedBuilder } = require("discord.js")
const {readdirSync} = require("fs");
const {prefix} = require("../../config.json");
module.exports = {
  name: "help",
  aliases: ["h"],
  description: "",
  usage: "",
  example: "",
  userprems: [""],
  botperms: [""],
  run: async (client, message, args, player) => {
    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir,
          value: cmds.length === 0 ? "" : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new EmbedBuilder()
        .setAuthor({ name: `|  Chip Help Menu: all`, iconURL: message.author.displayAvatarURL() })

        .addFields(categories)
        .setFooter({text:`Use ${prefix}help <command> to get more information about a command.`})
        .setColor(client.config.color);
      return message.channel.send({embeds:[embed]});
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new EmbedBuilder()
     .setAuthor({ name: `|  I couldn't find that command` , iconURL:message.author.displayAvatarURL()})
          .setColor(client.config.color);
        return message.channel.send({embeds:[embed]});
      }

      let embed = new EmbedBuilder()
        embed.setAuthor({ name:` | Commands Help Menu: ${args[0]}`})
        embed.addFields([
        { name:"Description",value:
          command.description
            ? command.description
            : "No description for this command."},
          

{name:"Usage",value:
          command.usage
            ? `\`- ${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``},


        { name:"Examples",value: command.example? `\`${command.example}\`` : "No nexample for this command."},
          {name:"Aliases",value:
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            :"No aliases for this command."}])
  
  embed.setFooter(
          {text:`Use ${prefix}help to get a list of all commands.`          }
    )
    .setColor(client.config.color);
      return message.channel.send({embeds:[embed]});
    }
  }
}