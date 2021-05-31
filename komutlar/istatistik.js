const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
const moment = require("moment");
const os = require('os');
require("moment-duration-format");
exports.run = async (client, message, args) => {
const { get } = require('axios').default;
const bot = await get('https://botsfordiscord.com/api/bot/796747151266414622');

  
    const hawliyapimci = client.users.cache.get("785765015487381525")
    const mesaj = new Discord.MessageEmbed()

    .setTitle(client.user.username + " | İstatistik")
    .setDescription(`**Bağlantılar**
● [Davet Linki](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) ● [Destek Sunucusu](https://discord.gg/qDtTcfA7MP) ● [Oy sayfası](https://botsfordiscord.com/bot/796747151266414622/vote)


**__Bot Verileri__**

    >  Kullanıcı Sayısı: **${client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString()}**
    >  Sunucu Sayısı: **${client.guilds.cache.size}**
    >  Kanal Sayısı: **${client.channels.cache.size}**
    >  Ping: **${client.ws.ping}ms**
    >  Yapımcı: **${hawliyapimci.tag}**
    
    **__ "Bots For Discord" Verileri__**
    
        > Bu Ayki Oyları: **${bot.data.votesMonth}**
    `)
    

    message.channel.send(mesaj)
};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["i", "bb"],
  permLevel: 0
};
 
exports.help = {
  name: 'istaistik',
  description: 'Kod denemek için kullanılır.',
  usage: 'eval [kod]'
};