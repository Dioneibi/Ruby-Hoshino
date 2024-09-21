import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import { PornhubApi } from 'pornhub-api'; // Asegúrate de tener esta librería instalada
import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `_*< DESCARGAS - PORNHUB />*_\n\n*☁️ Ingrese un ID de video de Pornhub.*\n\n*💌 Ejemplo:* _${usedPrefix + command} ph560b93077ddae_`;

    const api = new PornhubApi();

    try {
        // Obtén el video por ID
        const video = await api.video.get_by_id(text);
        
        const texto = `_💌 @${m.sender.split`@`[0]} ᩭ✎ Enviando Video, espere un momento...._`;
        const prep = generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
                text: texto,
                contextInfo: { mentionedJid: [m.sender] }
            }
        });
        
        await conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id });

        // Envía el video
        const desc = `_💌 ᩭ✎ Video descargado con éxito: ${video.title}_`;
        await conn.sendMessage(m.chat, { video: { url: video.url }, caption: desc }, { quoted: m });

    } catch (error) {
        throw `_*< DESCARGAS - PORNHUB />*_\n\n*🌟 Ocurrió un error. Por favor, inténtalo de nuevo más tarde.*`;
    }
};

handler.tags = ['descargas'];
handler.help = ['pornhub'];
handler.command = /^pornhub$/i; // Puedes ajustar el comando como desees
handler.register = true;

export default handler;
