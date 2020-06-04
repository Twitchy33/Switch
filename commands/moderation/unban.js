const { RichEmbed } = require("discord.js")
const { red_dark } = require("../../colors.json");

module.exports = {
  config: {
        name: "unban",
        description: "Unban a user from the guild!",
        usage: "<id> <optional reason>",
        category: "moderation",
        accessableby: "Administrators",
        aliases: ["ub", "unbanish"]
  },
    run: async (bot, message, args) => {
const switchc = bot.emojis.cache.find(emoji => emoji.name === "switchcancel");
      const switche = bot.emojis.cache.find(emoji => emoji.name === "switch");
    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(`${switchc} You dont have permission to perform this command!`)


	if(isNaN(args[0])) return message.channel.send(`${switchc} You need to provide an ID.`)
    let bannedMember = await bot.user.fetch(args[0])
        if(!bannedMember) return message.channel.send(`${switchc} Please provide a user id to unban someone!`)

    let reason = args.slice(1).join(" ")
        if(!reason) reason = `${switchc} No reason given!`

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(`${switchc} I dont have permission to perform this command!`)|
    message.delete()
    try {
        message.guild.member.unban(bannedMember, reason)
        message.channel.send(`${switche} ${bannedMember.tag} has been unbanned from the guild!`)
    } catch(e) {
        console.log(e.message)
    }

    }
}
