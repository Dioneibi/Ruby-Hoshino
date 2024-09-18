import fetch from 'node-fetch';
import { Configuration, OpenAIApi } from 'openai';

// Configuración de OpenAI API
const configuration = new Configuration({
  organization: global.openai_org_id,
  apiKey: global.openai_key
});
const openai = new OpenAIApi(configuration);

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `*Ingresa un texto para hablar con Ruby Hoshino*`, m, rcanal);
  
  try {
    await m.react('⏳');
    conn.sendPresenceUpdate('composing', m.chat);
    
    // Solicitud a la API de OpenAI para simular a Ruby Hoshino
    let response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: 'Eres Ruby Hoshino, un personaje de un anime popular.' }, { role: 'user', content: text }],
      temperature: 0.7
    });
    
    let result = response.data.choices[0].message.content;
    
    // Enviar mensaje con información contextual
    await conn.sendMessage(m.chat, {
      text: result,
      contextInfo: {
        externalAdReply: {
          title: '[ 𝐑 𝐔 𝐁 𝐘 - 𝐇 𝐎 𝐒 𝐇 𝐈 𝐍 𝐎 - 𝐀 𝐈 ]',
          body: '©2024 Angélito-OFICIAL',
          thumbnailUrl: 'https://i.ibb.co/235B4nn/file.jpg',
          sourceUrl: canal,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });
    
    await m.react('✅');
  } catch (error) {
    await m.react('❌');
    conn.reply(m.chat, 'Error al procesar la solicitud.', m, rcanal);
  }
};

handler.help = ['ruby <texto>'];
handler.tags = ['ai'];
handler.command = ['ruby'];

export default handler;
              
