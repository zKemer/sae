const Discord = require("discord.js");
const db = require('croxydb'); // creating database

const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
 


  let prefix = await db.fetch(`prefix_${message.guild.id}`);
  if (prefix == null) prefix = ayarlar.prefix;
  
  const yardım = new Discord.MessageEmbed()
    .setTimestamp()
    .setTitle(`${client.user.username}`)
    .setColor("#F0FFFF")
    .setDescription(`

**Menü Başlıkları**
> 📕 **Botlist**

> 📙 **Moderasyon**

> 📘 **Ekonomi Ve Kullanıcı**

> 📗 **Müzik**


`)
    
.setThumbnail("https://cdn.discordapp.com/attachments/795930062833582090/800706801468833802/pusula_star.png")
  if(!args[0])message.channel.send(yardım).then(msg => {
    msg.react('📕')
   .then(r => {
    msg.react('📙')
    .then(r => {
      msg.react('📘')
   .then(r => {
            msg.react('📗')
   const kirmizi = (reaction, user) => reaction.emoji.name === '📕' && user.id === message.author.id;
     
        const yeşil = (reaction, user) => reaction.emoji.name === '📗' && user.id === message.author.id;
     
      
   const reacty = msg.createReactionCollector(yeşil,);

       reacty.on('collect', r => {
        const sariembed = new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle(`${client.user.username}`)
        .setColor("#F0FFFF")
        .setDescription(`
    
    **Menü Başlıkları**
    > **${prefix}oynat**
    > **${prefix}bitir**
    > **${prefix}ses**
    > **${prefix}döngü**
    > **${prefix}ara**
    > **${prefix}durdur**
    > **${prefix}devam**

    
    `)
        
    .setThumbnail("https://cdn.discordapp.com/attachments/795930062833582090/800706801468833802/pusula_star.png")

   msg.edit(sariembed)
   r.users.remove(message.author.id);
  })

        
        
        
   const reactk = msg.createReactionCollector(kirmizi,);

       reactk.on('collect', r => {
        const kirmizi = new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle(`${client.user.username}`)
        .setColor("#F0FFFF")
        .setDescription(`
    
    **Menü Başlıkları**
    > **${prefix}botekle**
    > **${prefix}log-kanal**
    > **${prefix}onaylama-kanalı**
    > **${prefix}bot-ekleme-kanalı**
    > **${prefix}geliştirici-rolü**
    > **${prefix}botlist-ayarları**
    `)
        
    .setThumbnail("https://cdn.discordapp.com/attachments/795930062833582090/800706801468833802/pusula_star.png")
    .setFooter(`Pusula'nın eşsiz BotList komutları, emojiyle bot onaylama/reddetme bile var!`)
 
   msg.edit(kirmizi)
   r.users.remove(message.author.id);
  })

  
  const mavi = (reaction, user) => reaction.emoji.name === '📘' && user.id === message.author.id;
     
      
  const reactm = msg.createReactionCollector(mavi,);

      reactm.on('collect', r => {
       const maviembed = new Discord.MessageEmbed()
       .setTimestamp()
       .setTitle(`${client.user.username}`)
       .setColor("#F0FFFF")
       .setDescription(`
   
   **Ekonomi Komutları**
   > **${prefix}para**
   > **${prefix}yarışma**
   > **${prefix}market**
   > **${prefix}drop**
   > **${prefix}adamasmaca**
   
   **Kullanıcı Komutları**
   > **${prefix}durum-incele**
   > **${prefix}ara**
   > **${prefix}davet**
   > **${prefix}istatistik**

   
   `)
       
   .setThumbnail("https://cdn.discordapp.com/attachments/795930062833582090/800706801468833802/pusula_star.png")

  msg.edit(maviembed)
  r.users.remove(message.author.id);
 })

  const sari = (reaction, user) => reaction.emoji.name === '📙' && user.id === message.author.id;
     
      
   const reacts = msg.createReactionCollector(sari,);

       reacts.on('collect', r => {
        const sariembed = new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle(`${client.user.username}`)
        .setColor("#F0FFFF")
        .setDescription(`
    
    **Menü Başlıkları**
    > **${prefix}reactionrole**
    > **${prefix}sayaç**
    > **${prefix}prefix**
    > **${prefix}otorol**
    > **${prefix}ara**
    > **${prefix}mod-log**
    > **${prefix}yasaklı-kanal**
    > **${prefix}nuke**

    `)
        
    .setThumbnail("https://cdn.discordapp.com/attachments/795930062833582090/800706801468833802/pusula_star.png")
    .setFooter(`Ayarlanabilir komutları kaldırmak için ${prefix}<komut> sıfırla kullanın.`)
   msg.edit(sariembed)
   r.users.remove(message.author.id);
  })

 })
  })

})
 })  


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yardım2", "help", "h"],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "Yardım Menüsünü Gösterir.",
  usage: "yardım"
};
