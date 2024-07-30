import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
let res = await fetch('https://api.github.com/repos/nevi67/VermeilBot-MD')
let json = await res.json()
try {
let txt = `*Grupos*\n\n`
    txt += `✩  *VermeilBot-MD*\n`
    txt += `✩  *VermeilBot-MD comunidad:*\n`
    txt += `✩  https://chat.whatsapp.com/FOaoHm3M09f5gN0JSyhR5W\n`
    txt += `✩  *colaboraciones:*\n`
    txt += `✩  *asistencia Dekubot-MD x VermeilBot-MD:*\n`
    txt += `✩  https://chat.whatsapp.com/KBQZ7fAdAY3HtVudDl3Cmy\n\n`
    txt += `✩  *comunidad Dekubot-MD x VermeilBot-MD:*\n`
    txt += `✩  https://chat.whatsapp.com/CMTdDsE4YEBE1fvA4PN2PN\n`
    txt += `> 🍟 *${packname}*`

let img = imagen1

await conn.sendLuffy(m.chat, packname, wm, txt, img, img, redes, fkontak)
} catch {
await m.react(error)
}}
handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['comunidad', 'grupos']
handler.register = true 
export default handler