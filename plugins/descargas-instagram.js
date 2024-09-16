import axios from 'axios';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function getInstagramVideo(url) {
    try {
        // Fetch the page
        const response = await fetch(url);
        const body = await response.text();
        
        // Load the page HTML into cheerio
        const $ = cheerio.load(body);
        
        // Extract video URL from meta tags or embedded JSON
        const videoUrl = $('meta[property="og:video"]').attr('content');
        
        if (!videoUrl) {
            throw new Error('No se encontró URL del video en la página.');
        }
        
        return videoUrl;
    } catch (error) {
        throw new Error('No se pudo obtener el video de Instagram.');
    }
}

async function downloadVideo(videoUrl) {
    try {
        const response = await axios({
            method: 'get',
            url: videoUrl,
            responseType: 'arraybuffer'
        });
        return response.data;
    } catch (error) {
        throw new Error('No se pudo descargar el video.');
    }
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let fkontak = { "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" };
    
    if (!args[0]) return conn.reply(m.chat, `🚩 Te Faltó Un Link De Un Video De Instagram`, fkontak, m, { contextInfo: { 'forwardingScore': 0, 'isForwarded': false, externalAdReply: { showAdAttribution: false, title: packname, body: `👋 Hola ` + nombre, mediaType: 3, sourceUrl: redes, thumbnail: icons } } });

    try {
        const videoUrl = await getInstagramVideo(args[0]);
        const videoBuffer = await downloadVideo(videoUrl);

        await conn.sendMessage(m.chat, { video: videoBuffer, fileName: `video.mp4`, mimetype: 'video/mp4', caption: `╭━❰  ${packname}  ❱━⬣\n┃ 💜 𝙏𝙄𝙏𝙐𝙇𝙊\n┃ Video descargado\n╰━━━━━❰ *${vs}* ❱━━━━⬣` }, { quoted: m });
    } catch (error) {
        await conn.reply(m.chat, `Error: ${error.message}`, fkontak);
    }
};

handler.tags = ['descargas', 'instagram'];
handler.help = ['instavideo *<url instagram>*'];
handler.command = /^instavideo|instadl$/i;
export default handler;
                   
