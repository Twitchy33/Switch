module.exports = {
    config: {
        name: "reload",
        description: "reloads a bot command!",
        usage: "!reload",
        category: "owner",
        accessableby: "Owner",
        aliases: ["creload"]
    },
    run: async (bot, message, args) => {

    if(message.author.id != "220964116645281796") return message.channel.send(":x: You're the bot the owner!")

    if(!args[0]) return message.channel.send(":x: Please provide a command to reload!")

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)] // usage !reload <name>
        bot.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        bot.commands.set(commandName, pull)
    } catch(e) {
        return message.channel.send(`:x: Could not reload: \`${args[0].toUpperCase()}\``)
    }

    message.channel.send(`:white_check_mark: The command \`${args[0].toUpperCase()}\` has been reloaded!`)

    }
}
