import fetch from 'node-fetch'
import yts from 'yt-search'
import ytdl from 'ytdl-core'
import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let fkontak = { 
        "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, 
        "message": { 
            "contactMessage": { 
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        }, 
        "participant": "0@s.whatsapp.net" 
    }

    if (!args[0]) {
        return conn.reply(m.chat, `🚩 Te Faltó Un Link De Un Video De Youtube`, fkontak, m, {
            contextInfo: {
                'forwardingScore': 0,
                'isForwarded': false,
                externalAdReply: {
                    showAdAttribution: false,
                    title: packname,
                    body: `👋 Hola ${nombre}`,
                    mediaType: 3,
                    sourceUrl: redes,
                    thumbnail: icons
                }
            }
        })
    }

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
                        throw `🌀 *no se encontró*`;
                    }
                } else {
                    throw `𝙋𝘼𝙍𝘼 𝙋𝙊𝘿𝙀𝙍 𝙐𝙎𝘼𝙍 𝙀𝙎𝙏𝙀 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 𝘿𝙀 𝙀𝙎𝙏𝘼 𝙁𝙊𝙍𝙈𝘼 (${usedPrefix + command} <numero>), 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝙍𝙀𝘼𝙇𝙄𝙕𝘼𝙍 𝙇𝘼 𝘽𝙐́𝙎𝙌𝙐𝙀𝘿𝘼 𝘿𝙀 𝙑𝙄́𝘿𝙀𝙊𝙎 𝘾𝙊𝙉 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 ${usedPrefix}playlist <texto>*`;
                }
            } else {
                throw `𝙋𝘼𝙍𝘼 𝙋𝙊𝘿𝙀𝙍 𝙐𝙎𝘼𝙍 𝙀𝙎𝙏𝙀 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 𝘿𝙀 𝙀𝙎𝙏𝘼 𝙁𝙊𝙍𝙈𝘼 (${usedPrefix + command} <numero>), 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝙍𝙀𝘼𝙇𝙄𝙕𝘼𝙍 𝙇𝘼 𝘽𝙐́𝙎𝙌𝙐𝙀𝘿𝘼 𝘿𝙀 𝙑𝙄́𝘿𝙀𝙊𝙎 𝘾𝙊𝙉 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 ${usedPrefix}playlist <texto>*`;
            }
        }
    }

    await conn.reply(m.chat, `🌺 E S P E R E\n- 🍃 Se está descargando su video, espere un momento..`, fkontak, m, {
        contextInfo: {
            'forwardingScore': 0,
            'isForwarded': false,
            externalAdReply: {
                showAdAttribution: false,
                title: packname,
                body: `👋 Hola ${nombre}`,
                mediaType: 3,
                sourceUrl: redes,
                thumbnail: icons
            }
        }
    })

    try {
        let qu = args[1] || '360'
        let q = qu + 'p'
        let v = youtubeLink
        const yt = await ytdl.getInfo(v)
        const format = yt.formats.find(f => f.qualityLabel === q && f.hasVideo && f.hasAudio)
        const dl_url = format.url
        const ttl = yt.videoDetails.title
        const size = format.contentLength ? await bytesToSize(parseInt(format.contentLength)) : 'unknown'
        await conn.sendMessage(m.chat, {
            video: { url: dl_url },
            fileName: `${ttl}.mp4`,
            mimetype: 'video/mp4',
            caption: `╭━❰  ${packname}  ❱━⬣\n┃ 💜 𝙏𝙄𝙏𝙐𝙇𝙊\n┃ ${ttl}\n┃ 📏 𝙎𝙄𝙕𝙀\n┃ ${size}\n╰━━━━━❰ *${vs}* ❱━━━━⬣`,
            thumbnail: await fetch(yt.videoDetails.thumbnails[0].url)
        }, { quoted: m })
    } catch (E1) {
        try {
            let mediaa = await ytMp4(youtubeLink)
            await conn.sendMessage(m.chat, {
                video: { url: mediaa.result },
                fileName: `error.mp4`,
                caption: `${packname}`,
                thumbnail: mediaa.thumb,
                mimetype: 'video/mp4'
            }, { quoted: m })
        } catch (E2) {
            try {
                let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${lolkeysapi}&url=${youtubeLink}`)
                let lolh = await lolhuman.json()
                let n = lolh.result.title || 'error'
                let n2 = lolh.result.link
                let n3 = lolh.result.size
                let n4 = lolh.result.thumbnail
                await conn.sendMessage(m.chat, {
                    video: { url: n2 },
                    fileName: `${n}.mp4`,
                    mimetype: 'video/mp4',
                    caption: `╭━❰  ${packname}  ❱━⬣\n┃ 💜 𝙏𝙄𝙏𝙐𝙇𝙊\n┃ ${n}\n┃ 📏 𝙎𝙄𝙕𝙀\n┃ ${n3}\n╰━━━━━❰ *${vs}* ❱━━━━⬣`,
                    thumbnail: await fetch(n4)
                }, { quoted: m })
            } catch (E3) {
                await conn.reply(m.chat, `𝙀𝙎 𝙋𝙊𝙎𝙄𝙃𝙇𝙀 𝙌𝙐𝙀 𝙀𝙇 𝘼𝙍𝘾𝙃𝙄𝙑𝙊 𝙎𝙀𝘼 𝙈𝙐𝙔 𝙋𝙀𝙎𝘼𝘿𝙊. 𝙄𝙉𝙏𝙀𝙉𝙏𝙀 𝘾𝙊𝙉 𝙊𝙏𝙍𝘼 𝙊𝙋𝘾𝙄𝙊𝙉 𝘿𝙀 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼\n\n𝙄𝙏 𝙄𝙎 𝙋𝙊𝙎𝙎𝙄𝘽𝙇𝙀 𝙏𝙃𝘼𝙏 𝙏𝙃𝙀 𝙁𝙄𝙇𝙀 𝙄𝙎 𝙏𝙊𝙊 𝙃𝙀𝘼𝙑𝙔. 𝙏𝙍𝙔 𝘼𝙂𝘼𝙄𝙉 𝙒𝙄𝙏𝙃 𝘼𝙉𝙊𝙏𝙃𝙀𝙍 𝙊𝙋𝙏𝙄𝙊𝙉 𝙁𝙊𝙍 𝙃𝙀𝘼𝙑𝙔`, fkontak, m)
            }
        }
    }
}

async function bytesToSize(bytes) {
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return '0 Byte'
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

async function ytMp4(url) {
    let res = await axios.get(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${lolkeysapi}&url=${url}`)
    let data = res.data
    return { result: data.result.link, thumb: data.result.thumbnail }
}

export default handler
              
