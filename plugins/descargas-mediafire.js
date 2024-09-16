import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return conn.reply(m.chat, '🚩 Ingrese el enlace de un archivo de Mediafire.', m, rcanal)
    if (!args[0].match(/mediafire/gi)) return conn.reply(m.chat, '🍟 El enlace debe ser de un archivo de Mediafire.', m, rcanal)
    try {
        await m.react(rwait)
        
        // Realiza la solicitud a la API de dorratz
        let { data } = await axios.get(`https://api.dorratz.com/v2/mediafire-dl?url=${args[0]}`)

        // Extrae la información del archivo
        let { filename, size, mime, link } = data

        let txt = `乂  *¡MEDIAFIRE - DESCARGAS!*  乂\n\n`
        txt += `✩ *Nombre* : ${filename}\n`
        txt += `✩ *Peso* : ${size}\n`
        txt += `✩ *MimeType* : ${mime}\n\n`
        txt += `*- ↻ El archivo se está enviando, espera un momento...*`

        // Enviar la imagen de MediaFire como miniatura
        let img = await (await fetch('https://i.ibb.co/wLQFn7q/logo-mediafire.jpg')).buffer()
        await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, fkontak, null, rcanal)

        // Enviar el archivo descargado desde el link
        await conn.sendFile(m.chat, link, filename, null, fkontak, null, { mimetype: mime, asDocument: true })
        await m.react(done)
    } catch (err) {
        console.error(err)
        await m.react(error)
        conn.reply(m.chat, '⚠️ Error al descargar el archivo. Asegúrate de que el enlace sea válido.', m, rcanal)
    }
}

handler.help = ['mediafire']
handler.tags = ['descargas']
handler.command = ['mediafire', 'mdfire', 'mf']
handler.premium = false

export default handler
          
