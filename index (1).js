const Discord = require('discord.js');
const random = require('random');
const fs = require('fs');
const jsonfile = require('jsonfile');
const Canvas = require('canvas');
const ms = require('ms');
const moment = require('moment');   
const { create } = require('domain');
const { url } = require('inspector');
const bot = new Discord.Client();

const token = '';
const PREFIX = '/';
const fcool = new Set();
const m1c = new Set();
let cdsecs = 8640 * 10;
let hsecs = 3600;
var ct = {};
if (fs.existsSync('cookie.json')) {
    ct = jsonfile.readFileSync('cookie.json');
}

bot.on('ready', () =>{
    console.log('The bot is online!');
    bot.user.setActivity('type "/help" for commands').catch(console.error);
})

bot.on('message', async message=> {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
    const mentionedMember = message.mentions.users.first()

    if (message.author.id === bot.user.id)
        return;

    if (message.guild.id in ct === false) {
        ct[message.guild.id] = {};
    }

    const gbal = ct[message.guild.id];
    if (message.author.id in gbal === false) {
        gbal[message.author.id] = {
            cookie: 0,
        };
    }

    const fcbal = gbal[message.author.id];
    jsonfile.writeFileSync('cookie.json', ct);

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);

    switch(args[0]){
        case 'help':
            const hel = new Discord.MessageEmbed()
            .setTitle("Help page")
            .addField('/daily', "Claim some cookies")
            .addField('/bal', "shows ur bals")
            .addField('/stake', "Under Development")
            .addField('/inv', "Under Development")
            .addField('/shop', "Under Development")
            .addField('/mine-1', "Mine if u have a miner")
            .setColor('#FF5733')

            message.channel.send(hel);
        break;
    case 'bal':
        const db = new Discord.MessageEmbed()
        .setTitle('Your cookie balcne', message.author.id.username)
        .addField('Cookie', fcbal.cookie)
        .setColor("#FF5733")

        message.channel.send(db);
        break;
    case 'mine-1':
    if(message.member.roles.cache.has('862724211126435891')){
      elseif(fcool.has(message.author.id)){
            message.reply('Wait 1 hour so that miner can mine some cookies :)');
        }else{
        fcbal.cookie += 0.8;
        message.channel.send('You have mined some cookies, your miner produced 800 hashes. Come back in 1 hour to collect more.')
        fcool.add(message.author.id);
        setTimeout(() => {
            fcool.delete(message.author.id)
        }, hsecs * 1000)
        }
      else{
        message.reply('You cannot use this command, u do not have the miner-1')
        }
        break;
    }
});

bot.login(token);
