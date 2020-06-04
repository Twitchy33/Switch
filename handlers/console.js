module.exports = (bot) => {
let prompt = process.openStdin()
prompt.addListener("data", res => {
  let x = res.toSring().trim().split(/ +/g)
  bot.channels.get("55039958121971736").send(x.join(" "));
})
}
