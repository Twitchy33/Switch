const {MessageEmbed} = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("././warnings.json", "utf8"));
module.exports = {
  config:{
  name: "warn",
  category: "moderation",
  usage: "<user> <reason>"
  },
run: async (bot, message, args) => {
const switchc = bot.emojis.cache.find(emoji => emoji.name === "switchcancel");
  const switche = bot.emojis.cache.find(emoji => emoji.name === "switch");
  //!warn @daeshan <reason>
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${switchc} You do not have the right permissions to do that!`);
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply(`${switchc} Please supply a user to be warnned`);
  if(wUser.hasPermission("ADMINISTRATOR")) return message.reply(`${switchc} They are a admin/mod so you can not do that!`);
  let reason = args.join(" ").slice(22);
  
  wUser.send(`${switchc} You have been warrned in **${message.guild.name}** for **${reason}**`)
   message.channel.send(`${switche} **${wUser.user.tag}** has been warned!`).then(m => m.delete(5000))
  fs.writeFile("././warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

}
}
