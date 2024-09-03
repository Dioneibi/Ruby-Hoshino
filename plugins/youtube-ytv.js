import fetch from 'node-fetch'
import ytdl from 'ytdl-core'
import axios from 'axios'
import yts from 'yt-search'
import { ytDownload } from '@bochilteam/scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let fkontak = { 
    "key": { 
      "participants": "0@s.whatsapp.net", 
      "remoteJid": "status@broadcast", 
      "fromMe": false, 
      "id": "Halo" 
    }, 
    "message": { 
      "contactMessage": { 
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
      }
    }, 
    "participant": "0@s.whatsapp.net" 
  }
  
  if (!args[0]) return conn.reply(m.chat, `🚩 Te Faltó Un Link De Un Video De Youtube`, m, { quoted: fkontak })

  let youtubeLink = '';
  if (args[0].includes('you')) {
    youtubeLink = args[0];
  } else {
    const index = parseInt(args[0]) - 1;
    if (index >= 0) {
      if (Array.isArray(global.videoList) && global.videoList.length > 0) {
        const matchingItem = global.videoList.find(item => item.from === m.sender);
        if (matchingItem) {
          if (index < matchingItem.urls.length) {
            youtubeLink = matchingItem.urls[index];
          } else {
            throw `🌀 *No se encontró*`;
          }
        } else {
          throw `Para usar este comando de esta forma (${usedPrefix + command} <número>), realiza la búsqueda de videos con el comando ${usedPrefix}playlist <texto>`;
        }
      } else {
        throw `Para usar este comando de esta forma (${usedPrefix + command} <número>), realiza la búsqueda de videos con el comando ${usedPrefix}playlist <texto>`;
      }
    }
  }

  await conn.reply(m.chat, `🌺 ESPERE\n- 🍃 Se está descargando su video, espere un momento...`, fkontak, m, { quoted: fkontak });

  try {
    let quality = args[1] || '360p';
    const yt = await ytDownload(youtubeLink);
    const videoData = yt[quality] || yt['360p']; // Elige la calidad, por defecto '360p'
    const { download, title, fileSize } = videoData;

    await conn.sendMessage(m.chat, { 
      video: { url: download }, 
      fileName: `${title}.mp4`, 
      mimetype: 'video/mp4', 
      caption: `╭━❰  ${packname}  ❱━⬣\n┃ 💜 𝙏𝙄𝙏𝙐𝙇𝙊\n┃ ${title}\n╰━━━━━❰ *${vs}* ❱━━━━⬣`, 
      thumbnail: await fetch(yt.thumbnail).then(res => res.buffer())
    }, { quoted: m });
  } catch (E1) {
    try {
      const mediaa = await ytMp4(youtubeLink);
      await conn.sendMessage(m.chat, { 
        video: { url: mediaa.result }, 
        fileName: `error.mp4`, 
        caption: `${packname}`, 
        thumbnail: mediaa.thumb, 
        mimetype: 'video/mp4' 
      }, { quoted: m });
    } catch (E2) {
      try {
        const lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${lolkeysapi}&url=${youtubeLink}`);
        const lolh = await lolhuman.json();
        const { title, link, size, thumbnail } = lolh.result;
        await conn.sendMessage(m.chat, { 
          video: { url: link }, 
          fileName: `${title}.mp4`, 
          mimetype: 'video/mp4', 
          caption: `╭━❰  ${packname}  ❱━⬣\n┃ 💜 𝙏𝙄𝙏𝙐𝙇𝙊\n┃ ${title}\n╰━━━━━❰ *${vs}* ❱━━━━⬣`, 
          thumbnail: await fetch(thumbnail).then(res => res.buffer())
        }, { quoted: m });
      } catch (E3) {
        await conn.reply(m.chat, `El archivo es muy pesado. Intente con otra opción de descarga.`, m, { quoted: fkontak });
      }
    }
  }
}

handler.tags = ['descargas', 'youtube'];
handler.help = ['ytmp4 *<url youtube>*'];
handler.command = /^video|fgmp4|dlmp4|getvid|yt(v|mp4)?$/i;
export default handler;

function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
}

async function ytMp4(url) {
  const getUrl = await ytdl.getInfo(url);
  const result = getUrl.formats
    .filter(format => format.container === 'mp4' && format.hasVideo && format.hasAudio)
    .map(format => ({
      video: format.url,
      quality: format.qualityLabel,
      size: bytesToSize(format.contentLength)
    }))[0];

  const tinyUrl = await axios.get(`https://tinyurl.com/api-create.php?url=${result.video}`).then(res => res.data);
  const title = getUrl.videoDetails.title;
  const thumb = getUrl.videoDetails.thumbnails[0].url;
  
  return { title, result: tinyUrl, thumb };
}
