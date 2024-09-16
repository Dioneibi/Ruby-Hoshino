// Asumiendo que ya tienes las configuraciones de tu bot

let fetch = require('node-fetch');

async function mediafireHandler(m, { args }) {
    if (!args[0]) return m.reply('Por favor, proporciona un enlace de MediaFire.');

    let url = args[0];
    
    if (!url.includes('mediafire.com')) {
        return m.reply('El enlace proporcionado no es válido. Asegúrate de que sea un enlace de MediaFire.');
    }

    try {
        let res = await fetch(`https://api.dorratz.com/v2/mediafire-dl?url=${encodeURIComponent(url)}`);
        if (!res.ok) throw new Error('Error al obtener el archivo de MediaFire.');

        let json = await res.json();
        if (json.status !== true) throw new Error('No se pudo procesar el enlace.');

        let { filename, filesize, filetype, filelink } = json.result;
        
        // Envía la información del archivo y el enlace directo al usuario
        m.reply(`
        📂 *Nombre del archivo*: ${filename}
        🗂 *Tamaño*: ${filesize}
        📄 *Tipo*: ${filetype}
        🔗 *Descarga*: ${filelink}
        `);

    } catch (e) {
        m.reply('Ocurrió un error al intentar descargar el archivo.');
    }
}

handler.help = ['mediafire'];
handler.tags = ['descargas'];
handler.command = ['mediafire', 'mdfire', 'mf']; 
handler.premium = false;

module.exports = mediafireHandler;
