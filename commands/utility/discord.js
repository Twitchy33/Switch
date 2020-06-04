module.exports = {
  config:{
        name: "discord",
        description: "Invites to discord server",
        category: "utility",
        accessableby: "Members",
        usage: ""
  },
    run: async (bot, message, args) => {
      
  const switche = bot.emojis.cache.find(emoji => emoji.name === "switch");

message.channel.send(`${switche} | Discord Invite: https://discord.gg/FPTDC8r`)
    }
}