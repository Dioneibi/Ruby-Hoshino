import fg from 'api-dylux';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const limit = 350;

const handler = async (m, { conn, text }) => {
    if (!m.quoted) return conn.reply(m.chat, '🚩 *Etiqueta el mensaje que contenga el resultado de Play*', m);
    if (!m.quoted.text.includes("*Y O U T U B E - P L A Y*")) return conn.reply(m.chat, '🚩 *Etiqueta el mensaje que contenga el resultado de Play*', m);
    if (!m.quoted.isBaileys) return conn.reply(m.chat, '🚩 Etiqueta el mensaje mío del resultado Play', m);

    let urls = m.quoted.text.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/);
    if (!urls) return m.reply('×');
    
    try {
        await m.react('⏳'); // Show loading icon
        const yt = await fg.yta(urls[0], '128kbps');
        let { title, dl_url, size } = yt;

        if (size.split('MB')[0] >= limit) return conn.reply(m.chat, `🚩 El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m);

        await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m });
        await m.react('✅'); // Show done icon
    } catch (e) {
        await m.reply('✘ *Ocurrío un error*');
        console.log(e);
    }
};

handler.command = 'playaudio';
handler.register = true;
handler.group = true;

export default handler;
