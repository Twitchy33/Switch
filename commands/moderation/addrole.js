const { MessageEmbed } = require("discord.js")
const { red_light } = require("../../colors.json")

module.exports= {
  config:{
        name: "addrole",
        description: "Adds a role to a member of the guild!",
        usage: "<user> <reason>",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["ar", "roleadd"]
  },
    run: async (bot, message, args) => {
const switchc = bot.emojis.cache.find(emoji => emoji.name === "switchcancel");
      const switche = bot.emojis.cache.find(emoji => emoji.name === "switch");
    if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send(`${switchc} You dont have permission to perform this command!`)

    let rMember = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0])
    if(!rMember) return message.channel.send(`${switchc}  Please provide a user to add a role too.`)
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send(`${switchc} Please provide a role to add to said user.`)
    let reason = args.slice(2).join(" ")
    if(!reason) return message.channel.send(`${switchc}  Please provide a reason`)

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send(`${switchc} I don't have permission to perform this command.`)

    if(rMember.roles.cache.has(role.id)) {
        return message.channel.send(`${switchc} ${rMember.displayName}, already has the role!`)
    } else {
        await rMember.roles.add(role.id).catch(e => console.log(e.message))
        message.channel.send(`${switche} The role, ${role.name}, has been added to ${rMember.displayName}.`)
    }
    }
}