import fetch from 'node-fetch';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    organization: global.openai_org_id,
    apiKey: global.openai_key
});
const openai = new OpenAIApi(configuration);

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `🍟 *Ingrese su petición*\n🚩 *Ejemplo de uso:* ${usedPrefix + command} ¿Cómo te sientes hoy?`, m);

    try {
        await m.react('⏳'); // Indicador de que el bot está pensando
        conn.sendPresenceUpdate('composing', m.chat);

        // Formulario del mensaje para Ruby Hoshino
        const prompt = `Actúa como Ruby Hoshino, un personaje popular de anime. Responde a la siguiente consulta con el estilo y la personalidad de Ruby Hoshino: ${text}`;

        // Enviar solicitud a OpenAI API con el prompt modificado para Ruby Hoshino
        let response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 150,
            temperature: 0.7
        });

        // Obtener la respuesta generada
        let res = response.data.choices[0].text.trim();

        // Enviar la respuesta al usuario
        await conn.sendMessage(m.chat, { text: res }, { quoted: m });
        await m.react('✅'); // Indicador de que la respuesta está lista

    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'Error al procesar la solicitud', m);
    }
};

handler.help = ['ruby <texto>'];
handler.tags = ['ai'];
handler.command = ['ruby'];

export default handler;
            
