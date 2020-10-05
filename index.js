//1.Main globle handle
const Discord= require("discord.js");
const client = new Discord.Client();
const fs = require('fs')
/////////////////JSON FILE////////////////////////
const serverID = require('./config/serverID.json');
const roleID = require('./config/roleID.json');
const token = require('./config/token.json');
const prefix = require('./config/prefix.json');
const embed = require('./embed/pingpong.json');

//Load Events Files
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on('message', msg => {
  
  if(!msg.content.startsWith(prefix.pr)|| msg.author.bot) return;
  
  if(msg.content.startsWith(`${prefix.pr}ping`)) {
    msg.channel.send("Pinging...").then(m => {
      let ping = m.createdTimestamp - msg.createdTimestamp
      let choices = [embed.desc_1, embed.desc_2, embed.desc_3]
      let response = choices[Math.floor(Math.random() * choices.length)]
      
      m.edit(`${response}: ${embed.bot_1} \`${ping}\`, ${embed.bot_2} \`${Math.round(bot.ping)}\``)
    })
  }
  
})

client.on("ready", async () => {
  
    setInterval(function(){
        const guild = client.guilds.get(serverID.serverID);
        const roles = guild.roles.get(roleID.roleID);
        let colors = [
            '#FF4A4A',
            '#4AFFB1',
            '#FF8A8A',
            '#FFFF00',
            '#00EFFF',
            '#FF2CFF',
            '#00FF3C',
            '#ff004c',
            '#ffb300',
            '#00fa9a',
            '#fff85b',
            '#7b68ee',
            '#c1ffc1',
            '#faae52',
            '#ff0000',
            '#bc3afc',
            '#68ff00',
            '#ff4900',
        ]
        var startColor = Math.floor(Math.random() * colors.length);
        roles.setColor(colors[startColor]);
    });
}, 3000);// Change speed //3000

//Run the bot
client.login(token.tk);