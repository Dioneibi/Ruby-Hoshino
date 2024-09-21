import axios from 'axios'
const { proto, generateWAMessageFromContent, prepareWAMessageMedia, generateWAMessageContent } = (await import("@whiskeysockets/baileys")).default
const { PornhubApi } = await import('pornhub-api')
const api = new PornhubApi()

let handler = async (message, { conn, text }) => {
    if (!text) return conn.reply(message.chat, '🍟 *¿Qué quieres buscar en Pornhub?*', message, rcanal)

    async function createVideoMessage(url) {
        const { videoMessage } = await generateWAMessageContent({ video: { url } }, { upload: conn.waUploadToServer })
        return videoMessage
    }

    async function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
        }
    }

    try {
        await message.react(rwait)
        conn.reply(message.chat, '🚩 *Descargando el video...*', message, {
            contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, showAdAttribution: true, title: packname, body: wm, previewType: 0, thumbnail: icons, sourceUrl: channel } }
        })

        // Buscar videos en Pornhub
        let searchResults = await api.search_videos.search_videos(text, { ordering: "mostviewed", period: "weekly" })
        shuffleArray(searchResults)

        let selectedResults = searchResults.splice(0, 5) // Mostrar 5 resultados

        let results = []
        for (let result of selectedResults) {
            results.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: 'Video desde Pornhub' }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: '' + result.title,
                    hasMediaAttachment: true,
                    videoMessage: await createVideoMessage(result.url) // Crear mensaje con video
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
            })
        }

        const responseMessage = generateWAMessageFromContent(message.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({ text: '🚩 Resultado de: ' + text }),
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
handler.command = ['pornhubsearch', 'phsearch']
export default handler
            
