import fg from 'api-dylux'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import yts from 'yt-search'
import fetch from 'node-fetch' 

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    let lister = ["audio", "video"]

    let [feature, inputs] = text.split(" ")
    if (!lister.includes(feature)) return conn.reply(m.chat, `🚩 Ingresa el tipo de contenido (audio o video) junto con el título de un video de YouTube.\n\nEjemplo : ${usedPrefix + command} audio SUICIDAL-IDOL - ecstacy\n\nTipos disponibles :\n${usedPrefix + command} audio\n${usedPrefix + command} video`, m)

    if (lister.includes(feature)) {
        if (!inputs) return conn.reply(m.chat, `🚩 Ingresa el título de un video de YouTube.\n\n*Ejemplo:*\n*${usedPrefix + command}* SUICIDAL-IDOL - ecstacy`, m)

        await m.react('🕓')
        let res = await yts(text)
        let vid = res.videos[0]
        let txt = `*乂  Y O U T U B E  -  P L A Y*\n\n`
        txt += `	✩   *Título* : ${vid.title}\n`
        txt += `	✩   *Duración* : ${vid.timestamp}\n`
        txt += `	✩   *Visitas* : ${vid.views}\n`
        txt += `	✩   *Autor* : ${vid.author.name}\n`
        txt += `	✩   *Publicado* : ${eYear(vid.ago)}\n`
        txt += `	✩   *Url* : ${'https://youtu.be/' + vid.videoId}\n\n`
        txt += `*- ↻ Tu archivo se está procesando, por favor espera.*`

        await conn.sendButton(m.chat, txt, vid.thumbnail, [
            ['𝐌 𝐄 𝐍 𝐔 💥', `${usedPrefix}menu`],
            ['🔥 𝗔 𝗨 𝗗 𝗜 𝗢', `${usedPrefix}playaudio ${vid.url}`],
            ['🔥 𝗩 𝗜 𝗗 𝗘 𝗢', `${usedPrefix}playvideo ${vid.url}`]
        ], null, null, null, null)
        
        if (feature == "audio") {
            try {
                let yt = await fg.yta(vid.url, '128kbps')
                let { title, dl_url, size } = yt
                let limit = 100

                if (size.split('MB')[0] >= limit) return conn.reply(m.chat,`El archivo pesa más de ${limit} MB, se canceló la descarga.`, m).then(_ => m.react('✖️'))

                await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
                await m.react('✅')
            } catch {
                await m.react('✖️')
            }
        }

        if (feature == "video") {
            try {
                let yt = await fg.ytv(vid.url, '360p')
                let { title, dl_url, size } = yt
                let limit = 300

                if (size.split('MB')[0] >= limit) return conn.reply(m.chat,`El archivo pesa más de ${limit} MB, se canceló la descarga.`, m).then(_ => m.react('✖️'))

                await conn.sendMessage(m.chat, { document: { url: dl_url }, caption: '', mimetype: 'video/mp4', fileName: `${title}.mp4`}, {quoted: m })
                await m.react('✅')
            } catch {
                await m.react('✖️')
            }
        }
    }
}

handler.help = ['play'].map(v => v + " *<tipo> <búsqueda>*")
handler.tags = ['downloader']
handler.command = ['play']
handler.register = true 
export default handler

function eYear(txt) {
    if (!txt) return '×'
    if (txt.includes('month ago')) return 'hace ' + txt.replace("month ago", "").trim() + ' mes'
    if (txt.includes('months ago')) return 'hace ' + txt.replace("months ago", "").trim() + ' meses'
    if (txt.includes('year ago')) return 'hace ' + txt.replace("year ago", "").trim() + ' año'
    if (txt.includes('years ago')) return 'hace ' + txt.replace("years ago", "").trim() + ' años'
    if (txt.includes('hour ago')) return 'hace ' + txt.replace("hour ago", "").trim() + ' hora'
    if (txt.includes('hours ago')) return 'hace ' + txt.replace("hours ago", "").trim() + ' horas'
    if (txt.includes('minute ago')) return 'hace ' + txt.replace("minute ago", "").trim() + ' minuto'
    if (txt.includes('minutes ago')) return 'hace ' + txt.replace("minutes ago", "").trim() + ' minutos'
    if (txt.includes('day ago')) return 'hace ' + txt.replace("day ago", "").trim() + ' dia'
    if (txt.includes('days ago')) return 'hace ' + txt.replace("days ago", "").trim() + ' dias'
    return txt
}
