const {MessageEmbed} = require("discord.js")
const fs = require("fs")
const {aqua} = require("../../colors.json")


module.exports = {
  config:{
        name: "prefix",
        description: "Creates a Server Prefix",
        usage: "<desired prefix>",
        category: "moderation",
        accessableby: "Moderators"
  },

run: async (client, message, args) => {
        const switchc = client.emojis.cache.find(emoji => emoji.name === "switchcancel");
 
   if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send(`${switchc} You dont have permission to perform this command!`)
  if(!args[0] || args[0 === "help"]) return message.reply("Usage: !prefix <desired prefix>");
  
  let prefixes = JSON.parse(fs.readFileSync("././prefixes.json"));
  
  
  prefixes[message.guild.id] = {
    prefixes: args[0]
  }
  
  fs.writeFile("././prefixes.json", JSON.stringify(prefixes), (err) => {
    if(err) console.log(err)
  });
  
  let sEmbed = new MessageEmbed()
  
  .setColor(aqua)
  .setTitle(`${message.guild.name} Prefix Set`)
  .setDescription(`Set to ${args[0]}`);
  message.channel.send(sEmbed);
  
  }
}