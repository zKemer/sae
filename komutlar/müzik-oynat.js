const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require('fs');
const sendError = require("../util/error")
module.exports.run = async(client,message,args)=> {
   let channel = message.member.voice.channel;
    if (!channel)return sendError("Müzik Açman İçin Bir Sesli Kanalda Olman Gerekiyor.", message.channel);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))return sendError("Bulunduğun Kanala Bağlanma Yetkim Bulunmuyor.", message.channel);
    if (!permissions.has("SPEAK"))return sendError("Bulunduğun Kanalda Konuşma Yetkim Bulunmuyor.", message.channel);

    var searchString = args.join(" ");
    if (!searchString)return sendError("Çalacağım Bir Şarkı Adı Yazmalısın.", message.channel);
   	const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
   var serverQueue = message.client.queue.get(message.guild.id);

     let songInfo = null;
    let song = null;
    if (url.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)) {
       try {
          songInfo = await ytdl.getInfo(url)
          if(!songInfo)return sendError("Yazdığını Şarkıyı Youtube'da Bulamadım.", message.channel);
        song = {
       id: songInfo.videoDetails.videoId,
       title: songInfo.videoDetails.title,
       url: songInfo.videoDetails.video_url,
       img: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
      duration: songInfo.videoDetails.lengthSeconds,
      ago: songInfo.videoDetails.publishDate,
      views: String(songInfo.videoDetails.viewCount).padStart(10, ' '),
      req: message.author

        };

      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    }else {
      try {
        var searched = await yts.search(searchString);
    if(searched.videos.length === 0)return sendError("Yazdığınız Şarkıyı Youtube'da Bulamadım.", message.channel)
    
     songInfo = searched.videos[0]
        song = {
      id: songInfo.videoId,
      title: Util.escapeMarkdown(songInfo.title),
      views: String(songInfo.views).padStart(10, ' '),
      url: songInfo.url,
      ago: songInfo.ago,
      duration: songInfo.duration.toString(),
      img: songInfo.image,
      req: message.author
        };
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    }

    if (serverQueue) {
      serverQueue.songs.push(song);
      let thing = new MessageEmbed()
      .setAuthor("Şarkı Kuyruğa Eklendi", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      .setThumbnail(song.img)
      .setColor("GREEN")
      .addField("Şarkı Adı", song.title, true)
      .addField("Süre", song.duration, true)
      .addField("Açan Kullanıcı", song.req.tag, true)
      return message.channel.send(thing);
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 80,
      playing: true,
      loop: false
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async (song) => {
      const queue = message.client.queue.get(message.guild.id);
    let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
       if (!afk[message.guild.id]) afk[message.guild.id] = {
        afk: false,
    };
    var online = afk[message.guild.id]
    if (!song){
      if (!online.afk) {
        sendError("Şarkı bitirildi.", message.channel)
        message.guild.me.voice.channel.leave();//724 engel
        message.client.queue.delete(message.guild.id);
      }
            return message.client.queue.delete(message.guild.id);
}
 let stream = null; 
    if (song.url.includes("youtube.com")) {
      
      stream = await ytdl(song.url);
stream.on('error', function(er)  {
      if (er) {
        if (queue) {
        queue.songs.shift();
        play(queue.songs[0]);
  	  return sendError(`An unexpected error has occurred.\nPossible type \`${er}\``, message.channel)
          }
        }
    });
}
    queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));

      const dispatcher = queue.connection
         .play(ytdl(song.url, {quality: 'highestaudio', highWaterMark: 1 << 25 ,type: "opus"}))
         .on("finish", () => {
           const shiffed = queue.songs.shift();
            if (queue.loop === true) {
                queue.songs.push(shiffed);
            };
          play(queue.songs[0])
        })

      dispatcher.setVolumeLogarithmic(queue.volume / 100);
      let thing = new MessageEmbed()
 
      .setThumbnail(song.img)
      .setColor("GREEN")
      .addField("Şarkı Adı", song.title, true)
      .addField("Süre", song.duration, true)
      .addField("Açan Kullanıcı", song.req.tag, true)
      
      queue.textChannel.send(thing);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`Kanala Katılırken Bir Hata Oluştu HATA : ${error}`);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return sendError(`Kanala Katılırken Bir Hata Oluştu HATA : ${error}`, message.channel);
    }
  


},

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['çal', 'play'],
  permLevel: 0
};

exports.help = {
  name: 'oynat',
  description: 'Espri yapar.',
  usage: 'espri'
};
