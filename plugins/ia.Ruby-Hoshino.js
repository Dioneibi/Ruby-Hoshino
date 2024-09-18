import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '*Ingresa un texto para hablar con Ruby Hoshino*', m);

    try {
        // Reemplaza la URL con la API adecuada para Ruby Hoshino
        let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/ruby?text=${text}`);
        let json = await api.json();

        if (json.status === 'true') {
            await conn.sendMessage(m.chat, {
                text: json.result,
                contextInfo: {
                    externalAdReply: {
                        title: '[ 𝐑 𝐔 𝐁 𝐘 - 𝐇 𝐎 𝐒 𝐇 𝐈 𝐍 𝐎 - 𝐀 𝐈 ]',
                        body: '©2024 Angèlito-OFc',
                        thumbnailUrl: 'https://i.ibb.co/your-thumbnail-url.jpg', // Cambia la URL de la miniatura según sea necesario
                        sourceUrl: canal, // Asegúrate de definir `canal` o remplázalo con la URL que desees
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: m });
        } else {
            conn.reply('error :v');
        }
    } catch {
        conn.reply('error :v');
    }
};

handler.help = ['ruby <texto>'];
handler.tags = ['ai'];
handler.command = ['ruby'];

export default handler;
