import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  let chat = global.db.data.chats[m.chat];

  if (chat.welcome && m.messageStubType == 27) {
    let imgWelcome = imagen7; // Imagen para los que se unen
    let welcome = `✨ *Tatsumaki Bot* ✨\n┌─────────────────\n│👋 ¡Bienvenido(a), @${m.messageStubParameters[0].split`@`[0]}!\n│🎉 Ahora eres parte de *${groupMetadata.subject}*.\n│🛡️ ¡Disfruta y sigue las reglas!\n└─────────────────`;
    await conn.sendLuffy(m.chat, packname, textbot, welcome, imgWelcome, imgWelcome, redes, fkontak);
  }

  if (chat.welcome && m.messageStubType == 28) {
    let imgBye = imagen6; // Imagen para los que se salen
    let bye = `✨ *Tatsumaki Bot* ✨\n┌─────────────────\n│👋 @${m.messageStubParameters[0].split`@`[0]} ha dejado el grupo.\n│💔 Esperamos verte pronto de nuevo.\n└─────────────────`;
    await conn.sendLuffy(m.chat, packname, textbot, bye, imgBye, imgBye, redes, fkontak);
  }

  if (chat.welcome && m.messageStubType == 32) {
    let imgBye = imagen6; // Imagen para los que son removidos (también puede ser imagen6)
    let kick = `✨ *Tatsumaki Bot* ✨\n┌─────────────────\n│🚪 @${m.messageStubParameters[0].split`@`[0]} ha sido removido.\n│🎬 ¡Esperamos que encuentres tu camino!\n└─────────────────`;
    await conn.sendLuffy(m.chat, packname, textbot, kick, imgBye, imgBye, redes, fkontak);
  }
}
