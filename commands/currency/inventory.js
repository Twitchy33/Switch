
const Discord = require('discord.js')

module.exports = {
  config: {
  name: 'inventory',
  category: 'currency',
  description: 'Shows all things in your inventory.',
  usage: 'inventory'
  },
run: async (client, message, args) => {

  
  message.channel.send("Inventory coming soon to Switch 1.2!")
}

}