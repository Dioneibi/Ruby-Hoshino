import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) throw `_𝐄𝐬𝐜𝐫𝐢𝐛𝐞 𝐮𝐧𝐚 𝐩𝐞𝐭𝐢𝐜𝐢𝐨́𝐧 𝐥𝐮𝐞𝐠𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞𝐣𝐞𝐦𝐩𝐥𝐨:_ \n*${usedPrefix + command} Billie Eilish - Bellyache*`;

    try {
        const yt_play = await search(args.join(' '));
        const texto1 = `
╭─🍂⬪🅳🅾🅾🅺🅨🅜🅾🅡⬪─╮
│
├ ⚘ 𝕋𝕚𝕥𝕝𝕠: ${yt_play[0].title}
├ ⚘ 𝔻𝕦𝕣𝕒𝑐𝕚𝕠𝕟: ${secondString(yt_play[0].duration.seconds)}
├ ⚘ 𝕍𝕚𝕤𝕥𝕒𝕤: ${MilesNumber(yt_play[0].views)}
├ ⚘ 𝔸𝕦𝕥𝕠𝓇: ${yt_play[0].author.name}
├ ⚘ 𝔼𝕟𝕝𝕒𝕔𝕖: ${yt_play[0].url}
╰───────────────────
`.trim();

        await conn.sendButton(m.chat, texto1, yt_play[0].thumbnail, [['𝐌 𝐄 𝐍 𝐔 💥', `${usedPrefix}menu`], ['🔥 𝗔 𝗨 𝗗 𝗜 𝗢', `${usedPrefix}playaudio ${yt_play[0].url}`], ['🔥 𝗩 𝗜 𝗗 𝗘 𝗢', `${usedPrefix}playvideo ${yt_play[0].url}`]], null, null);
    } catch (e) {
        await conn.reply(m.chat, `*[ ! ] ʜᴜʙᴏ ᴜɴ ᴇʀʀᴏʀ ᴇɴ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ ᴘᴏʀ ғᴀᴠᴏʀ ɪɴᴛᴇɴᴛᴀ ᴍᴀs ᴛᴀʀᴅᴇ..*`, null, m);
        console.log(`❗❗ᴇʀʀᴏʀ ${usedPrefix + command} ❗❗`);
        console.log(e);
    }
};

handler.command = ['play'];
handler.register = true;
handler.group = true;

export default handler;

async function search(query, options = {}) {
    const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
    return search.videos;
}

function MilesNumber(number) {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1.';
    const arr = number.toString().split('.');
    arr[0] = arr[0].replace(exp, rep);
    return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
    const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
    const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
    const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
    return dDisplay + hDisplay + mDisplay + sDisplay;
}
    
