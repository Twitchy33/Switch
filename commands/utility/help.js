const {MessageEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { readdirSync,fs } = require("fs")
const { stripIndents } = require("common-tags")
const { cyan } = require("../../colors.json")

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "halp", "commands"],
        usage: "<optinal command>",
        category: "utility",
        description: "Displays all commands that the bot has.",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
      
        
  
        const embed = new MessageEmbed()
            .setColor(cyan)
            .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL({format: 'png'}))
            .setThumbnail(bot.user.displayAvatarURL({format: 'png'}))

        if(!args[0]) {
            const categories = readdirSync("./commands/")
 

            embed.setDescription(`These are the avaliable commands for ${message.guild.me.displayName}`)
            embed.setFooter(`© ${message.guild.me.displayName} | Total Commands: ${bot.commands.size}`, bot.user.displayAvatarURL({format: 'png'}));
            categories.forEach(category => {
                const dir = bot.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.addField(`❯ ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(" "))
                } catch(e) {
                    console.log(e)
                }
            })
                  message.reply("Sent info to your DMs!")
            return message.author.send(embed)
        } else {

            let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${prefix}help\` for the list of the commands.`))
            command = command.config

            embed.setDescription(stripIndents`The bot's prefix is: \`${prefix}\`\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "No Description provided."}
            **Usage:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "No Usage"}
            **Accessible by:** ${command.accessableby || "Members"}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`)

            return message.channel.send(embed)
        }
    }
  
}