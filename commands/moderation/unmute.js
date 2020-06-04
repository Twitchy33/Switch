const { MessageEmbed } = require("discord.js")
const { red } = require("../../colors.json");

module.exports = {
  config: {
        name: "unmute",
        description: "Unmutes a member in the discord!",
        usage: "<user> <reason>",
        category: "moderation",
        accessableby: "Members",
        aliases: ["unm", "speak"]
  },
    run: async (bot, message, args) => {
      const switchc = bot.emojis.cache.find(emoji => emoji.name === "switchcancel");
      const switche = bot.emojis.cache.find(emoji => emoji.name === "switch");
  if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send(`${switchc} **You do not have the permission to use this command!**`)

  if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send(`${switchc} **I do not have permission to add roles!**`)

  let mutee =  message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!mutee) return message.channel.send(`${switchc} **Please supply a user to be muted!**`)

  let reason = args.slice(1).join(" ");
  if(!reason) reason = `${switchc} **No reason was given!**`

  let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
  if(!muterole) return message.channel.send(`${switchc} There is no mute role to remove!`)

  mutee.roles.remove(muterole.id).then(() => {
    message.delete()
    mutee.send(`${switche} You have been unmuted in ${message.guild.name} for: **${reason}**`).catch(err => console.log(err))
    message.channel.send(`${switche} ${mutee.user.username} was successfully unmuted.`).then(m => m.delete(2000))
  })


    }
}
