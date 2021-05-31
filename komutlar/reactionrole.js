const Discord = require("discord.js");
const db = require('croxydb'); // creating database
const error = require('../util/error.js')
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
  var permissions = message.channel.permissionsFor(client.user);
  if (!permissions.has('SEND_MESSAGES')) {
  
    
    return;
    
  }

 
  if(!message.member.hasPermission('MANAGE_ROLES')) return error('<:pusula_x:801061526463184897> Bu komutu kullanmak için gerekli yetkiye sahip değilsin',message.channel)

    let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[0])
    const emoji = message.guild.emojis.cache.find(r => r.name == args[1]) || message.guild.emojis.cache.find(r => r.id == args[1])
let miktar = args[0]
  if (!miktar) return error('<:pusula_x:801061526463184897> Bir rol belirtmelisin!',message.channel);

  if(!role) return error("<:pusula_x:801061526463184897> Bir rol belirtmelisin!",message.channel)
  if(!args[1]) return error("<:pusula_x:801061526463184897> Bir emoji belirtmelisin.",message.channel)
  
  if(!args[2]) return error("<:pusula_x:801061526463184897> Bir mesaj ID'si belirtmelisin.",message.channel)
  if(args[2] == db.fetch(`rr.msg.${message.guild.id}`)) return error("<:pusula_x:801061526463184897> Bu ID'de zaten bir tepki-rol bulunuyor.",message.channel)
if(!emoji.id) return error("<:pusula_x:801061526463184897> Bu sunucuda böyle bir emoji bulunamadı.",message.channel)
if(!message.channel.messages.cache.get(args[2])) return error("<:pusula_x:801061526463184897> Bir mesaj ID'si belirtmelisin.",message.channel)
db.set(`rr.kanal.${message.guild.id}`, message.channel.id)
db.set(`rr.msg.${message.guild.id}`, args[2])
db.set(`rr.emoji.${message.guild.id}`, emoji.id)
  db.set(`rr.role.${message.guild.id}`, role.id)
 message.channel.messages.cache.get(args[2]).react(emoji.id)
 error(`Bundan sonra ${args[2]} ID'li mesajdaki ${emoji.name} emojisine tıklayınca ${role.name} rolünü vereceğim.`,message.channel)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rr"],
  permLevel: 0
};

exports.help = {
  name: "reactionrole",
  description: "Yardım Menüsünü Gösterir.",
  usage: "yardım"
};
