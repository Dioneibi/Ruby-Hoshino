import axios from 'axios'
import { proto, generateWAMessageFromContent, generateWAMessageContent } from '@whiskeysockets/baileys'
import { PornhubApi } from 'pornhub-api'
import { AioHttpBackend } from 'pornhub-api/backends/aiohttp'
import asyncio from 'asyncio'

let handler = async (message, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(message.chat, '🍟 *¿Qué video deseas buscar en Pornhub?*', message, rcanal)

    async function createVideoMessage(url) {
        const { videoMessage } = await generateWAMessageContent({ video: { url } }, { upload: conn.waUploadToServer })
        return videoMessage
    }

    try {
        await message.react(rwait)
        conn.reply(message.chat, '🚩 *Buscando videos en Pornhub...*', message, {
            contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, showAdAttribution: true,
                title: packname,
                body: wm,
                previewType: 0, thumbnail: icons,
                sourceUrl: channel }}
        })

        // Iniciar cliente API de Pornhub con AioHttp
        async function searchVideos(query) {
            const api = new PornhubApi()
            const videos = api.search_videos.search_videos(query, ordering="mostviewed", period="weekly")
            return videos
        }

        // Buscar videos
        const searchResults = await searchVideos(text)
        let results = []

        for (let vid of searchResults) {
            results.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: textbot }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: '' + vid.title,
                    hasMediaAttachment: true,
                    videoMessage: await createVideoMessage(vid.url)
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
            })
        }

        const responseMessage = generateWAMessageFromContent(message.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({ text: '🚩 Resultados de búsqueda para: ' + text }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: '🔎 Pornhub - Búsquedas' }),
                        header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...results] })
                    })
                }
            }
        }, { quoted: message })

        await message.react(done)
        await conn.relayMessage(message.chat, responseMessage.message, { messageId: responseMessage.key.id })
    } catch (error) {
        await conn.reply(message.chat, error.toString(), message)
    }
}

handler.help = ['pornhubsearch <txt>']
handler.estrellas = 1
handler.register = true
handler.tags = ['buscador']
handler.command = ['pornhubsearch', 'phs', 'pornsearch']

export default handler
                    
