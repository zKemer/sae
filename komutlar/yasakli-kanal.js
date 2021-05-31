const Discord = require("discord.js");
const db = require('croxydb'); // creating database

const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
 
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('<:pusula_x:791401835088445451> Bu komutu kullanmak için gerekli yetkiye sahip değilsin')
     let prefix = await db.fetch(`prefix_${message.guild.id}`);
  if (prefix == null) prefix = ayarlar.prefix;
   
    var kanal = message.mentions.channels.first() 
  if(args[0] == "sıfırla") {
    
    if(!args[1])return message.channel.send("<:pusula_x:791401835088445451> Yasaklı kanal sıfırlamak için bir kanal belirtmedin.")
    if(!kanal)return message.channel.send("<:pusula_x:791401835088445451> Yasaklı kanal sıfırlamak için bir kanal belirtmedin.")
   if(db.fetch(`yasakli_kanal_${message.guild.id}_${kanal.id}`) == "yasaklı_uwu") {
     db.delete(`yasakli_kanal_${message.guild.id}_${kanal.id}`)
     const embed = new Discord.MessageEmbed()
.setDescription("<:pusula_tik:791401834559569960> Yasaklı kanal başarıyla sıfırlandı. Artık o kanalda komut kullanıldığında tepki verilecek.")
.setFooter(`${prefix}yasaklı-kanal sıfırla <#etiket>`)

     message.channel.send(embed)
                                                                                  } else { return message.channel.send("Bu kanal zaten yasaklı değil.")}

    return;
  }
    
    if(!args[0])return message.channel.send("<:pusula_x:791401835088445451> Yasaklı kanal ayarlamak için bir kanal belirtmedin.")
    if(!kanal)return message.channel.send("<:pusula_x:791401835088445451> Yasaklı kanal ayarlamak için bir kanal belirtmedin.")
db.set(`yasakli_kanal_${message.guild.id}_${kanal.id}`, 'yasaklı_uwu')

const embed = new Discord.MessageEmbed()
.setDescription("<:pusula_tik:791401834559569960> Yasaklı kanal başarıyla ayarlandı. Artık o kanalda komut kullanıldığında tepki verilmeyecek.")
.setFooter(`${prefix}yasaklı-kanal sıfırla <#etiket>`)
     message.channel.send(embed)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yasaklı-kanal"],
  permLevel: 0
};

exports.help = {
  name: "yasaklı-kanal",
  description: "Yardım Menüsünü Gösterir.",
  usage: "yardım"
};
