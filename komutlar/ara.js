const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  var search = require('youtube-search');
  return message.channel.send("Bu komut kısa bir süreliğine kapalı kalacaktır.")
  if(!args.join(" ")) return message.channel.send("Youtube araması için bir kelime belirtin.")
  const wtf = require('wtf_wikipedia')
wtf.extend(require('wtf-plugin-nsfw'))
 
  var opts = {
    maxResults: 10,
    key: 'AIzaSyBNv7r7njLNxLGTEglWVKent2hc_RkEMR0'
  };

  search(args.slice(0).join(" ").toString().trim(), opts, async function(err, results) {
    if(err) return console.log(err);

  let pages = [`
  > İsim: **[${results[0].title}](${results[0].link})**

  > Açıklama: **${results[0].description || "Bulunmuyor"}**

  > Kanal: [**${results[0].channelTitle}**](https://www.youtube.com/channel/${results[0].channelId})
  
  `, `
  > İsim : **[${results[1].title}](${results[1].link})**

  > Açıklama: **${results[1].description || "Bulunmuyor"}**

  > Kanal: [**${results[1].channelTitle}**](https://www.youtube.com/channel/${results[1].channelId}): 
  
  `, `
  > İsim: **[${results[2].title}](${results[2].link})**

  > Açıklama: **${results[2].description || "Bulunmuyor"}**

  > Kanal: [**${results[2].channelTitle}**](https://www.youtube.com/channel/${results[2].channelId})
  
  `];
   let resmpages = [`${results[0].thumbnails.default.url}
   `, `${results[1].thumbnails.default.url}
   `, `${results[2].thumbnails.default.url}
   `];

  let page = 1;
const nsfwjs = require("@nsfw-filter/nsfwjs") 
nsfwjs.load().then(function (model) {
  model.classify(results[0].thumbnails.default.url).then(function (predictions) {
    // Classify the image
    console.log('Predictions: ', predictions)
  })
})
    
    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setFooter(`Sayfa ${page} / ${pages.length}`)
    .setThumbnail(resmpages[page-1])
    .setDescription(pages[page-1])
  message.channel.send(embed).then(msg => {
 
  msg.react('⬅️')
  .then(r => {
    msg.react('➡️')
 
      //Filter
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡️' && user.id === message.author.id;
 
      const backwards = msg.createReactionCollector(backwardsFilter, { time: 100000 });
      const forwards = msg.createReactionCollector(forwardsFilter, { time: 100000 });
 
      forwards.on('collect', r => {
        if(page === pages.length) return;
        page++;
        embed.setDescription(pages[page-1]);
        embed.setThumbnail(resmpages[page-1])
        embed.setColor('RANDOM')
        embed.setFooter(`Sayfa ${page} / ${pages.length}`)
        msg.edit(embed)
      })
      backwards.on('collect', r => {
        if(page === 1) return;
        page--;
        embed.setColor('RANDOM')
        embed.setThumbnail(resmpages[page-1])
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Sayfa ${page} / ${pages.length}`)
        msg.edit(embed)
      })
 
    })
  })

});

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ara", "ara", "ara"],
  permLevel: 0
};

exports.help = {
  name: "ara",
  description: "YardÄ±m MenÃ¼sÃ¼nÃ¼ GÃ¶sterir.",
  usage: "yardÄ±m"
};

