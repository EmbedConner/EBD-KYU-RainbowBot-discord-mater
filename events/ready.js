exports.run = async (bot) => {
    console.log("Loading..");
    console.log(`${bot.user.tag} is online`);
    console.log("Done Rainbow..");
    bot.user.setActivity(`Rainbow Bot|@mention me!!`)
}