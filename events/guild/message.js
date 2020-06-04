const botconfig  = require("../../botconfig.json");
const fs = require("fs")

module.exports = async (bot, message) => { 
    if(message.author.bot || message.channel.type === "dm") return;
  let prefixes = JSON.parse(fs.readFileSync("././prefixes.json", "utf8"))
  
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  
  let prefix = prefixes[message.guild.id].prefixes;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if(commandfile) commandfile.run(bot, message, args)
}