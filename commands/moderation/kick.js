const { RichEmbed } = require("discord.js")
const { red_dark } = require("../../colors.json");

module.exports = {
  config:{
        name: "kick",
        description: "Kick a user from the guild!",
        usage: "<user> <reason>",
        category: "moderation",
        accessableby: "Moderator",
        aliases: ["k"]
  },
  
     run: async (bot, message, args) => {
       const switchc = bot.emojis.cache.find(emoji => emoji.name === "switchcancel");
       const switche = bot.emojis.cache.find(emoji => emoji.name === "switch");
 if (!message.member.hasPermission('KICK_MEMBERS', 'ADMINISTRATOR')) return message.channel.send(`${switchc} **${message.author.username}, Sorry, you need \`KICK_MEMBERS\` Permission to use this commands**!`).then(msg=>msg.delete(7000));

let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!kickMember) return message.channel.send(`${switchc} **Please supply a user to be kicked!**`);

let reason = args.slice(1).join(" ")
if(!reason) return message.channel.send(`${switchc} No reason was provided`)

if(!message.guild.member(bot.user).hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(`${switchc} **I do not have the permissions to complete this command!**`)



kickMember.kick().catch(err => console.log(err))

message.channel.send(`${switche} **${kickMember.user.tag}** has been kicked!`).then(m => m.delete(5000))
}
}
