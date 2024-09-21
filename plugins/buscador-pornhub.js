import axios from 'axios'
import { proto, generateWAMessageFromContent, generateWAMessageContent } from '@whiskeysockets/baileys'
import { PornhubApi } from 'pornhub-api'
import { AioHttpBackend } from 'pornhub-api/backends/aiohttp'

let handler = async (message, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(message.chat, '🍟 *¿Qué video deseas buscar en Pornhub?*', message)

    async function createVideoMessage(url) {
        const { videoMessage } = await generateWAMessageContent({ video: { url } }, { upload: conn.waUploadToServer })
        return videoMessage
    }

    try {
        await message.react('⏳')
        conn.reply(message.chat, '🚩 *Buscando videos en Pornhub...*', message)

        const api = new PornhubApi(new AioHttpBackend())
        const videos = await api.search_videos.search_videos(text, { ordering: 'mostviewed', period: 'weekly' })

        let results = []
        for (let vid of videos) {
            results.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({ text: vid.title }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '🔎 Pornhub - Resultado' }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: vid.title,
                    hasMediaAttachment: true,
                    videoMessage: await createVideoMessage(vid.url)
                })
            })
        }

        const responseMessage = generateWAMessageFromContent(message.chat, {
            interactiveMessage: {
                body: proto.Message.InteractiveMessage.Body.create({ text: '🚩 Resultados de búsqueda para: ' + text }),
                footer: proto.Message.InteractiveMessage.Footer.create({ text: '🔎 Pornhub - Búsquedas' }),
                header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...results] })
            }
        }, { quoted: message })

        await conn.relayMessage(message.chat, responseMessage.message, { messageId: responseMessage.key.id })
        await message.react('✅')
    } catch (error) {
        await conn.reply(message.chat, '❌ Error: ' + error.toString(), message)
    }
}

handler.help = ['pornhubsearch <txt>']
handler.tags = ['buscador']
handler.command = ['pornhubsearch', 'phs']
handler.register = true

export default handler
                    
