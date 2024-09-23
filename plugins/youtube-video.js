import fg from 'api-dylux'
import yts from 'yt-search'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
let limit = 350
let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
if (!m.quoted) return conn.reply(m.chat, '🚩 *Etiquete el mensaje que contenga el resultado del Play*', m, rcanal)
if (!m.quoted.text.includes("*乂  Y O U T U B E  -  P L A Y  乂*")) return conn.reply(m.chat, '🚩 *Etiquete el mensaje que contenga el resultado del Play*', m, rcanal)
if (!m.quoted.isBaileys) return conn.reply(m.chat, '🚩 Etiqueta el mensaje mío del resultado Play', m, rcanal)
let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
if (!urls) return m.reply('×')
if (urls.length < text) return conn.reply(m.chat, '🚩 *No se encontraron resultados*', m, rcanal)
let q = urls[1] || '480p'
try {
await m.react(rwait)
const yt = await fg.ytv(urls[0], q)
let { title, dl_url, size, author, views, duration, published, id } = yt 

if (size.split('MB')[0] >= limit) return conn.reply(m.chat, `🚩 El archivo pesa más de ${limit} MB, se canceló la descarga.`, m, rcanal) 

conn.reply(m.chat, `🕒 *Descargando El Video*`, m, {
contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: wm,
previewType: 0, thumbnail: icons,
sourceUrl: channel }}})
await conn.sendMessage(m.chat, { video: { url: dl_url }, caption: `_*DESCARGAS - MEGUMIN 🔥*_
╭───────┈♡┈──────
│𐇵 *𝑻𝒊𝒕𝒖𝒍𝒐:* ${title}
│𐇵 *𝑃𝑢𝑏𝑙𝑖𝑎𝑑𝑜:* ${published}
│𐇵 *𝐷𝑢𝑟𝑎𝑐𝑖𝑜𝑛:* ${duration}
│𐇵 *𝑉𝑖𝑠𝑡𝑎𝑠:* ${views}
│𐇵 *𝐴𝑢𝑡𝑜𝑟:* ${author}
│𐇵 *𝐼𝐷:* ${id}
│𐇵 *𝑇𝑖𝑝𝑜:* video
│𐇵 *𝐸𝑛𝑙𝑎𝑐𝑒:* ${urls[0]}
│𐇵 *𝐶𝑎𝑛𝑎𝑙:* [Canal del autor]
╰───────┈♢┈──────
> *[ ℹ️ ] _𝐒𝐞 𝐞𝐬𝐭𝐚́ 𝐞𝐧𝐯𝐢𝐚𝐧𝐝𝐨 𝐞𝐥 vídeo. 𝐞𝐬𝐩𝐞𝐫𝐞..._*`, mimetype: 'video/mp4', fileName: `${title}` + `.mp4`}, {quoted: fkontak })
await m.react(done)
} catch {
try {
let yt = await fg.ytmp4(urls[0], q)
let { title, size, dl_url, author, views, duration, published, id } = yt

if (size.split('MB')[0] >= limit) return conn.reply(m.chat, `🚩 El archivo pesa más de ${limit} MB, se canceló la descarga.`, m, rcanal) 

await conn.sendMessage(m.chat, { video: { url: dl_url }, caption: `_*DESCARGAS - MEGUMIN 🔥*_
╭───────┈♡┈──────
│𐇵 *𝑻𝒊𝒕𝒖𝒍𝒐:* ${title}
│𐇵 *𝑃𝑢𝑏𝑙𝑖𝑎𝑑𝑜:* ${published}
│𐇵 *𝐷𝑢𝑟𝑎𝑐𝑖𝑜𝑛:* ${duration}
│𐇵 *𝑉𝑖𝑠𝑡𝑎𝑠:* ${views}
│𐇵 *𝐴𝑢𝑡𝑜𝑟:* ${author}
│𐇵 *𝐼𝐷:* ${id}
│𐇵 *𝑇𝑖𝑝𝑜:* video
│𐇵 *𝐸𝑛𝑙𝑎𝑐𝑒:* ${urls[0]}
│𐇵 *𝐶𝑎𝑛𝑎𝑙:* [Canal del autor]
╰───────┈♢┈──────
> *[ ℹ️ ] _𝐒𝐞 𝐞𝐬𝐭𝐚́ 𝐞𝐧𝐯𝐢𝐚𝐧𝐝𝐨 𝐞𝐥 vídeo. 𝐞𝐬𝐩𝐞𝐫𝐞..._*`, mimetype: 'video/mp4', fileName: `${title}` + `.mp4`}, {quoted: fkontak })
await m.react(done)
} catch {
await m.reply(`✘ *Ocurrió un error*`)
}}}
handler.help = ['Video']
handler.tags = ['descargas', 'youtube']
handler
                                 
