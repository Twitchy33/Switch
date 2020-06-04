const { RichEmbed } = require("discord.js")
const { red_dark } = require("../../colors.json");
const ms = require("ms");

module.exports = {
  config:{
        name: "mute",
        description: "Mutes a member in the discord!",
        usage: "<user> <reason>",
        category: "moderation",
        accessableby: "Members",
        aliases: ["m", "nospeak"]
  },
    run: async (bot, message, args) => {
// check if the command caller has permission to use the command
      const switchc = bot.emojis.cache.find(emoji => emoji.name === "switchcancel");
      const switche = bot.emojis.cache.find(emoji => emoji.name === "switch");
      
if(!message.member.hasPermission("MANAGE_ROLES", "ADMINISTRATOR") || !message.guild.owner) return message.channel.send(`${switchc} **You do not have the permission to use this command!**`);

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send(`${switchc} **I do not have the permission to add roles!**`)

//define the reason and mutee
      
let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
      
  if(!tomute) return message.channel.send(`${switchc} Please mention a user to mute!`);
    

 let muterole = message.guild.roles.cache.find(r => r.name === "Muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#ff0000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          CONNECT: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply(`${switchc} You didn't specify a time!`);

  await(tomute.roles.add(muterole.id));
  message.reply(`${switche} <@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);
           tomute.send(`${switchc} Hello, you have been muted in ${message.guild.name} for: **${mutetime}**`).catch(err => console.log(err))

  setTimeout(function(){
    tomute.roles.remove(muterole.id);
    message.channel.send(`${switche} <@${tomute.id}> is no longer muted! Welcome Back!!`);
  }, ms(mutetime));
    }
}