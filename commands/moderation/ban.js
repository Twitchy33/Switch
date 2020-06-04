const { RichEmbed } = require("discord.js")
const { red_dark } = require("../../colors.json");

module.exports = {
  config:{
        name: "ban",
        description: "Bans a user from the discord!",
        usage: "<user> <reason>",
        category: "moderation",
        accessableby: "Administrators",
        aliases: ["b", "banish", "remove"]
  },
    run: async (bot, message, args) => {
const switchc = bot.emojis.cache.find(emoji => emoji.name === "switchcancel");
      const switche = bot.emojis.cache.find(emoji => emoji.name === "switch");
      
if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(`${switchc} **You do not have the permissions to complete this command!**`)


let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!banMember) return message.channel.send(`${switchc} **Please supply a user to be banned!**`)

let reason = args.slice(1).join(" ")
if(!reason) reason = "No reason was provided!"

if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(`${switchc} **I do not have permission to complete this command!**`)

message.delete()
  message.guild.members.ban(banMember, { days: 1 , reason: reason}).catch(err => console.log(err))


    message.channel.send(`${switche} **${banMember.user.tag}** has been banned!`).then(m => m.delete(5000))


}
}