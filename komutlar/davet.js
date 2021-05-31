const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
  

    const hawliyapimci = client.users.cache.get("785765015487381525")
    const mesaj = new Discord.MessageEmbed()

    .setTitle(client.user.username + " | İstatistik")
    .setDescription(`**Bağlantılar**
● [Davet Linki](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) 
● [Destek Sunucusu](https://discord.gg/qDtTcfA7MP) 
● [Oy sayfası](https://botsfordiscord.com/bot/796747151266414622/vote)


    `)
    

    message.channel.send(mesaj)
};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["daved", "devad"],
  permLevel: 0
};
 
exports.help = {
  name: 'davet',
  description: 'Kod denemek için kullanılır.',
  usage: 'eval [kod]'
};