import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return conn.reply(m.chat, '🚩 Ingrese el enlace de un archivo de Mediafire.', m, rcanal)
    if (!args[0].match(/mediafire/gi)) return conn.reply(m.chat, '🍟 El enlace debe ser de un archivo de Mediafire.', m, rcanal)
    
    try {
        await m.react(rwait)

        // Reemplazamos la API anterior por la nueva API de Dorratz
        let response = await axios.get(`https://api.dorratz.com/v2/mediafire-dl?url=${args[0]}`)
        let { filename, size, mime, url } = response.data

        let txt = `乂  *¡MEDIAFIRE - DESCARGAS!*  乂\n\n`
        txt += `✩ *Nombre* : ${filename}\n`
        txt += `✩ *Peso* : ${size}\n`
        txt += `✩ *MimeType* : ${mime}\n\n`
        txt += `*- ↻ El archivo se está enviando, espera un momento... soy lento.*`

        let img = await (await fetch('https://i.ibb.co/wLQFn7q/logo-mediafire.jpg')).buffer()
        await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, fkontak, null, rcanal)
        await conn.sendFile(m.chat, url, filename, null, fkontak, null, { mimetype: mime, asDocument: true })
        await m.react(done)
    } catch {
        await m.react(error)
    }
}

handler.help = ['mediafire']
handler.tags = ['descargas']
handler.command = ['mediafire', 'mdfire', 'mf']
handler.premium = false

export default handler
            
