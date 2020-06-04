const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { prefix } = require("../../botconfig.json");
const db = require('quick.db')
let bal = require("../../database/balance.json");
const fs = require('fs');
const cooldowns = new Map();

const humanizeDuration = require('humanize-duration');

//Set cooldown


module.exports = {
  config:{
    name: "beg",
    aliases: [],
    category: "currency",
    description: "Gets you money",
    usage: "[command | alias]"
  },
    run: async (client, message, args) => {
const cooldown = cooldowns.get(message.author.id);
if (cooldown) {
  const remaining = humanizeDuration(cooldown - Date.now(),{ units: ['s'],round: true });
  let cEmbed = new MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Slow down, cmon!")
  .setDescription(`You dont want to be like a cry baby! You will be able to beg in \`${remaining}\` just you wait!\n\nWhile you wait why not follow our [Twitter](https://twitter.com/switchoffical)`)
  return message.channel.send(cEmbed)
    .catch(console.error);

    } else {
      var failChance = Math.floor((Math.random()-0.001)*4);
   if(failChance === 0){
     const Fwork = require('../../failbeg.json');
  const FworkR = Fwork[Math.floor(Math.random() * Fwork.length)];
       message.channel.send(`${FworkR}`);
       return;
   }
if(!bal[message.author.id]){
    bal[message.author.id] = {
      balance: 0
    };
  } 

  const Jwork = require('../../beg.json');
  const JworkR = Jwork[Math.floor(Math.random() * Jwork.length)];
  var random = Math.floor(Math.random() * 20) + 3;
  let curBal = bal[message.author.id].balance 
  bal[message.author.id].balance = curBal + random;
  fs.writeFile('././database/balance.json', JSON.stringify(bal, null, 2), (err) => {
    message.channel.send(`
    **${JworkR}** has donated ${random} coins to <@${message.author.id}>!`)
    if (err) console.log(err)
  });
          
        // Adds the user to the set so that they can't talk for a minute
cooldowns.set(message.author.id, Date.now() + 10000);
setTimeout(() => cooldowns.delete(message.author.id), 10000);
    }
}

}
    

