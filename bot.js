const Discord = require('discord.js');
const client = new Discord.Client(); 
const ayarlar = require('./ayarlar.json');
const { Collection, Client } = require("discord.js");

client.commands = new Collection();//youtube.com/NoblesYT
client.queue = new Map()


//////////////////////////////////////////////////
  client.login(ayarlar.token)
const chalk = require('chalk')
const { Util } = require('discord.js');
const fs = require('fs');
const express = require('express');
const db = require('croxydb')
////////////////////////////////////////////////
require('./util/eventLoader.js')(client);
const app = express();
////////////////////////////////////////////////
 function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

//////////////////////////////////////////////////
app.get("/", (request, response) => {
  response.write('tamamdır yeğen')
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
//////////////////////////////////////////////////
var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};
/////////
client.on("ready", () => {
console.log(`Ready ;)`)
})

//////////////////////////////////////////////////
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`🌐 Toplamda ${files.length} Adet Komut Yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`⚡ "${props.help.name}" Adlı Komut Başarıyla Yüklendi.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});
//////////////////////////////////////////////////
client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
//////////////////////////////////////////////////
client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
//////////////////////////////////////////////////
client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
//////////////////////////////////////////////////
client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};
//////////////////////////////////////////////////

//////////////////////////////////////////////////
client.on('guildDelete', guild => {

let arda = new Discord.MessageEmbed()

.setColor("RED")
.setTitle("Sunucudan ayrıldım ")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.cache.get('837969561059983361').send(arda);

});


client.on('guildCreate', guild => {

let arda = new Discord.MessageEmbed()

.setColor("GREEN")
.setTitle("Sunucuya Eklendim")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.cache.get('837969561059983361').send(arda);

});



client.on('message', async message => {

    if(message.channel.id === db.fetch(`bot-ekleme-kanalı_${message.guild.id}`)){      
   
         await sleep(3000)
        
        if(!message.member.hasPermission("ADMINISTRATOR") || message.author.id == "796747151266414622") message.delete()
     
    }else return;
 
  }) 

client.on('guildMemberAdd', async member => {
if(db.fetch(`botlist_${member.guild.id}.${member.id}.durum`) == "bekliyor") {
  let sahip = db.fetch(`botlist_${member.guild.id}.${member.id}.sahip`)
  db.set(`botlist_${member.guild.id}.${member.id}.durum`, "onaylı")
client.channels.cache.get(db.fetch(`botlist_${member.guild.id}.bot-log-kanalı`)).send(" <@"+sahip+"> adlı kullanıcının <@" +member.id+"> (`"+member.id+"`) adlı botu onaylandı.")
} 
})
client.on('guildMemberAdd', async member => {
  const hata = require('./util/error.js')
const üyerol = db.fetch(`${member.guild.id}_otorol.üye`)
const üye = member.guild.roles.cache.get(üyerol)
const botrol = db.fetch(`${member.guild.id}_otorol.bot`)
const bot = member.guild.roles.cache.get(botrol)
const kanal= db.fetch(`${member.guild.id}_otorol.kanal`)
const kanall = member.guild.channels.cache.get(kanal)

  if(member.user.bot == true &&botrol) {
    member.roles.add(botrol)
   if(kanall) hata(`Yeni katılan ${member.user.tag} adlı bota ${bot.name} adlı rol verildi.`, kanall)
  } else {
  
  if(member.user.bot== false &&üyerol){ 
      
    member.roles.add(üyerol)
      if(kanall) hata(`Yeni katılan ${member.user.tag} adlı kullanıcıya ${üye.name} adlı rol verildi.`,kanall)

                                       
  } else return
  
  }

})
