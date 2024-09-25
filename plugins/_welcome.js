import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let chat = global.db.data.chats[m.chat]

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenido = `Bienvenido @${m.messageStubParameters[0].split`@`[0]}`
await conn.sendMini(m.chat, packname, team, bienvenido, welcome, welcome, channel, fkontak)
  }

  if (chat.welcome && m.messageStubType == 28) {
    let bye = `Adios @${m.messageStubParameters[0].split`@`[0]}`
await conn.sendMini(m.chat, packname, team, bye, adios, adios, channel, fkontak)
  }

  if (chat.welcome && m.messageStubType == 32) {
    let kick = `Adios @${m.messageStubParameters[0].split`@`[0]}`
await conn.sendMini(m.chat, packname, team, kick, adios, adios, channel, fkontak)
}}

/*import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let img = imagen1
  let chat = global.db.data.chats[m.chat]

  if (chat.welcome && m.messageStubType == 27) {
    let welcome = `┌─★ *Ai Yaemori - MD* \n│「 Bienvenido 」\n└┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │✑  Bienvenido a\n   │✑  ${groupMetadata.subject}\n   └───────────────┈ ⳹`
await conn.sendMini(m.chat, packname, dev, welcome, img, img, redes, fkontak)
  }

  if (chat.welcome && m.messageStubType == 28) {
    let bye = `┌─★ *Ai Yaemori - MD* \n│「 ADIOS 👋 」\n└┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │✑  Se fue\n   │✑ Jamás te quisimos aquí\n   └───────────────┈ ⳹`
await conn.sendMini(m.chat, packname, dev, bye, img, img, redes, fkontak)
  }

  if (chat.welcome && m.messageStubType == 32) {
    let kick = `┌─★ *Ai Yaemori - MD* \n│「 ADIOS 👋 」\n└┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │✑  Se fue\n   │✑ Jamás te quisimos aquí\n   └───────────────┈ ⳹`
await conn.sendMini(m.chat, packname, dev, kick, img, img, redes, fkontak)
}}*/

/*import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
if (!m.messageStubType || !m.isGroup) return !0
let vn = 'https://qu.ax/cUYg.mp3'
let chat = global.db.data.chats[m.chat]

if (chat.welcome && m.messageStubType == 27) {
this.sendMessage(m.chat, { audio: { url: vn }, contextInfo: { forwardedNewsletterMessageInfo: { newsletterJid: '120363263466636910@newsletter', serverMessageId: '', newsletterName: '『✯ Team Channel Ai Yaemori ✯』' }, forwardingScore: 9999999, isForwarded: true, mentionedJid:[nombre], "externalAdReply": { "title": '乂 ＷＥＬＣＯＭＥ 乂', "body": '⚡︎ ᥣіgһ𝗍ᥒіᥒց - 𝗍ᥱᥲm ⚡︎', "previewType": "PHOTO", "thumbnailUrl": null, "thumbnail": icons, "sourceUrl": redes, "showAdAttribution": true}}, seconds: '4556', ptt: true, mimetype: 'audio/mpeg', fileName: `error.mp3` }, {quoted: null, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}

if (chat.welcome && m.messageStubType == 28) {
this.sendMessage(m.chat, { text: `Se fue @${m.messageStubParameters[0].split`@`[0]} nadie lo va ha extrañar 😹`,
contextInfo:{ forwardedNewsletterMessageInfo: { newsletterJid: '120363263466636910@newsletter', serverMessageId: '', newsletterName: '『✯ Team Channel Ai Yaemori ✯』' }, forwardingScore: 9999999, isForwarded: true, mentionedJid:[nombre], "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "title": '乂 Ａ Ｄ Ｉ Ｏ́ Ｓ 乂', body: '⚡︎ ᥣіgһ𝗍ᥒіᥒց - 𝗍ᥱᥲm ⚡︎', "previewType": "PHOTO", "thumbnailUrl": ``, "thumbnail": icons, "sourceUrl": `${redes}`}}}, {quoted: null, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}

if (chat.welcome && m.messageStubType == 32) {
this.sendMessage(m.chat, { text: `Se fue @${m.messageStubParameters[0].split`@`[0]} nadie lo va ha extrañar 😹`,
contextInfo:{ forwardedNewsletterMessageInfo: { newsletterJid: '120363263466636910@newsletter', serverMessageId: '', newsletterName: '『✯ Team Channel Ai Yaemori ✯』' }, forwardingScore: 9999999, isForwarded: true, mentionedJid:[nombre], "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "title": '乂 Ａ Ｄ Ｉ Ｏ́ Ｓ 乂', body: '⚡︎ ᥣіgһ𝗍ᥒіᥒց - 𝗍ᥱᥲm ⚡︎', "previewType": "PHOTO", "thumbnailUrl": ``, "thumbnail": icons, "sourceUrl": `${redes}`}}}, {quoted: null, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}}*/
