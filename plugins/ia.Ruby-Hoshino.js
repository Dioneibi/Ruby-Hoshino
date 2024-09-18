import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '*Ingresa un texto para hablar con Ruby Hoshino*', m);

    try {
        // Reemplaza con tu clave API de OpenAI
        const apiKey = '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';
        
        let response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: text,
                max_tokens: 150 // Ajusta según tus necesidades
            })
        });
        
        let json = await response.json();

        if (json.choices && json.choices.length > 0) {
            let result = json.choices[0].text.trim();

            await conn.sendMessage(m.chat, {
                text: result,
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
                            
