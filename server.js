/////////////////host website//////////////////////////////////////////////////////////
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
///////////////host bot///////////////////////////////////////////////////////////////
const Discord= require("discord.js");
const client = new Discord.Client();
const bot = client;
const fs = require('fs')
/////////////////JSON FILE/////////////////////////
const serverID = require('./config/serverID.json');
const roleID = require('./config/roleID.json');
const token = require('./config/token.json');
const prefix = require('./config/prefix.json');
const embed = require('./embed/pingpong.json');
///////////////////////////////////////////////////////////

const keepalive = require('express-glitch-keepalive');
app.use(keepalive);

app.get('/', (req, res) => {
  res.json('Ok');
});

/////////////////event//////////////////////////////////////
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

bot.on('message', msg => {

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

client.on("ready", async (message) => {

  setInterval(function() {

  const guild = bot.guilds.get(serverID.serverID);
  const role = guild.roles.get(roleID.roleID);

       let color = [
        '#FF4A4A',
        '#4AFFB1',
        '#FF8A8A',
        '#FFFF00',
        '#00EFFF',
        '#FF2CFF',
        '#00FF3C'
         ]
  var lol = [Math.floor(Math.random() * color.length)]
  role.setColor(color[lol]);
}, 3000)

setInterval(function() {
    process.exit(60000)
  },400000)

});
client.on("message", async message => {
// Bot Mention Embed
  if(message.content.toLowerCase() === `<@${client.user.id}>`){
    let embed = new Discord.RichEmbed()
    .setTitle("**Rainbow Bot**")
    .addField("`Prefix`", `\`\`\`${prefix.pr}\`\`\``, true)
    .addField("`help`", `\`\`\`${prefix.pr}ping\`\`\``, true)
    .setThumbnail(client.user.displayAvatarURL)
    .setColor(`${message.guild.me.displayHexColor!=='#00000000' ? message.guild.me.displayHexColor : 0xffffff}`);
    message.channel.send(embed);
  };
  })
////////////////////////////////login bot////////////////////////////////////////////

bot.login(token.tk)
