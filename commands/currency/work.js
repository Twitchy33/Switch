const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { prefix } = require("../../botconfig.json");
const db = require('quick.db')
let bal = require("../../database/balance.json");
let works = require('../../database/works.json');
const fs = require('fs');
const cooldowns = new Map();

const humanizeDuration = require('humanize-duration');

//Set cooldown


module.exports = {
  config:{
    name: "work",
    aliases: [],
    category: "currency",
    description: "Gets you money",
    usage: ""
  },
    run: async (client, message, args) => {
const cooldown = cooldowns.get(message.author.id);
if (cooldown) {
  const remaining = humanizeDuration(cooldown - Date.now(),{ units: ['m', 's'],round: true });
  let cEmbed = new MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Slow down, cmon!")
  .setDescription(`You will be able to work in \`${remaining}\` just you wait!\n\nWhile you wait why not follow our [Twitter](https://twitter.com/switchoffical)`)
  return message.channel.send(cEmbed)
    .catch(console.error);

    } else {
if(!bal[message.author.id]){
    bal[message.author.id] = {
      balance: 0
    };
  } 
  if(!works[message.author.id]) {
  	works[message.author.id] = {
  	 work: 0
  	};
  } 

  const Jwork = require('../../work.json');
  const JworkR = Jwork[Math.floor(Math.random() * Jwork.length)];
  var random = Math.floor(Math.random() * 100) + 1;
  let curBal = bal[message.author.id].balance 
  bal[message.author.id].balance = curBal + random;
  let curWork = works[message.author.id].work
  works[message.author.id].work = curWork + 1;
  fs.writeFile('././database/works.json', JSON.stringify(works, null, 2), (err) => {
  	if (err) console.log(err)
  	})
  fs.writeFile('././database/balance.json', JSON.stringify(bal, null, 2), (err) => {
    let embed = new MessageEmbed() 
    .setColor("RANDOM") 
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: 'png'}))
    .setDescription(`
    ${JworkR} **${random} coins**
    `) 
    .setFooter("Switch 1.1")
    message.channel.send(embed)
    if (err) console.log(err)
  });
          
        // Adds the user to the set so that they can't talk for a minute
cooldowns.set(message.author.id, Date.now() + 900000);
setTimeout(() => cooldowns.delete(message.author.id), 900000);
    }
}

}
    

