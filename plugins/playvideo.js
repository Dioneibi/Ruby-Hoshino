import ytdl from 'ytdl-core';

const playvideoHandler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) throw `_𝐄𝐬𝐜𝐫𝐢𝐛𝐞 𝐮𝐧𝐚 𝐩𝐞𝐭𝐢𝐜𝐢𝐨́𝐧 𝐥𝐮𝐞𝐠𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞𝐣𝐞𝐦𝐩𝐥𝐨:_ \n*${usedPrefix + command} Billie Eilish - Bellyache*`;

    try {
        const ytURL = args.join(' ');
        const info = await ytdl.getInfo(ytURL);
        const videoStream = ytdl(ytURL, { quality: 'highestvideo' });

        await conn.sendVideo(m.chat, videoStream, { caption: `🎥 ${info.videoDetails.title}` });
    } catch (e) {
        await conn.reply(m.chat, `*[ ! ] ʜᴜʙᴏ ᴜɴ ᴇʀʀᴏʀ ᴇɴ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ ᴘᴏʀ ғᴀᴠᴏʀ ɪɴᴛᴇɴᴛᴀ ᴍᴀs ᴛᴀʀᴅᴇ..*`, fkontak);
        console.log(`❗❗ᴇʀʀᴏʀ ${usedPrefix + command} ❗❗`);
        console.log(e);
    }
};

playvideoHandler.command = ['playvideo'];
playvideoHandler.register = true;
playvideoHandler.group = true;
export default playvideoHandler;
