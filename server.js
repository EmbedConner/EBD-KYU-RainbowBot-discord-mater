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
/////////////////JSON FILE///////////////////////////////////////////////////////////
const serverID = require('./config/serverID.json');
const roleID = require('./config/roleID.json');
const token = require('./config/token.json');
const prefix = require('./config/prefix.json');
const embed = require('./embed/pingpong.json');

////////////////////////////////////////////////////////////////////////////////////

const keepalive = require('express-glitch-keepalive');
app.use(keepalive);
 
app.get('/', (req, res) => {
  res.json('Ok');
});

//////event//////////////////////////////////////////////////////////////////////////
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
  var lol = [Math.floor(Math.random() * color.length)]
  role.setColor(color[lol]);
}, 3000)

setInterval(function() {
    process.exit(60000)
  },900000)

});
client.on("message", async message => {
// Bot Mention Embed
  if(message.content.toLowerCase() === `<@${client.user.id}>`){
    let embed = new Discord.RichEmbed()
    .setTitle("**Rainbow Bot**")
    .addField("__**Prefix**__", `\`\`\`${prefix.pr}\`\`\``, true)
    .addField("__**help**__", `\`\`\`${prefix.pr}ping\`\`\`\n\`\`\`${prefix.pr}botinfo\`\`\`\n\`\`\`${prefix.pr}restart\`\`\``, true)
    .setImage('https://i.imgur.com/WSJZUb2.gif')
    .setThumbnail(client.user.displayAvatarURL)
    .setColor(`${message.guild.me.displayHexColor!=='#00000000' ? message.guild.me.displayHexColor : 0xffffff}`);
    message.channel.send(embed);
  }
  
  if(message.content.startsWith(`${prefix.pr}botinfo`)) {
	// Uptime
	let totalSeconds = bot.uptime / 1000;
	let days = Math.floor(totalSeconds / 86400);
	let hours = Math.floor(totalSeconds / 3600 - days * 24);
	totalSeconds %= 3600;
	let minutes = Math.floor(totalSeconds / 60);
	let seconds = Math.floor(totalSeconds % 60);

	let uptime = `${days} days:${hours} hours:${minutes} minutes:${seconds} seconds`;

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("__**Bot Information**__")
    .setColor("RANDOM")
    .setThumbnail(bicon)
    .addField("**Bot Name**", bot.user.username)
    .addField("**Time Up**", `${uptime}`)
    .addField("**Created On**", bot.user.createdAt)
    .setTimestamp() //This sets the timestamp.
    .setFooter(`Requested by : ${message.author.tag}`) //This sets the footer of the embed to text of your choice.
    .setImage('https://i.imgur.com/WSJZUb2.gif')
    
   message.react("✅")
   message.channel.send("Information Loading......").then(msg=>msg.delete(2000)).then(msg=>msg.channel.send(botembed))
 }
  if(message.content.startsWith(`${prefix.pr}restart`)) {
  
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${message.author}You Must have \`MANAGE_MASSAGE\` to run this command.`);
    
  message.channel.send(`${message.author} Restarted in ${Math.floor(bot.ping)}ms`).then(msg=>msg.delete(9000)).then(() =>{
  process.exit(1);
})
    
  }})
////////////////////////////////login bot////////////////////////////////////////////

bot.login(token.tk)
