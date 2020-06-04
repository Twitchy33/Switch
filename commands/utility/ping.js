const { stripIndents } = require('common-tags');

module.exports = {
  config:{
        name: "ping",
        description: "PONG! Displays the api & bot latency",
        usage: "",
        category: "utility",
        accessableby: ""
  },

run: async (client, message, args) => {
 const msg = await message.channel.send('Pinging...');
    const ping = Math.round(msg.createdTimestamp - message.createdTimestamp);

    if (ping <= 0) {
      return msg.edit('Please try again...');
    }

        msg.edit(`Pong! ${''.repeat(Math.ceil(ping / 100))} \`${ping}ms\``);
  }
}