const { exec } = require('child_process');

const handler = async (m, { conn }) => {
  const nombreUsuario = m.pushName || '%name'; // Nombre del usuario

  exec('./update.sh', (error, stdout, stderr) => {
    if (error) {
      conn.reply(m.chat, `Error: ${error.message}`, m);
      return;
    }
    if (stderr) {
      conn.reply(m.chat, `Error en la ejecución: ${stderr}`, m);
      return;
    }
    conn.reply(m.chat, `Resultado de la ejecución:\n${stdout}`, m);
  });
};

handler.help = ['menup'];
handler.tags = ['info'];
handler.command = /^(update)$/i;
handler.register = true;

export default handler;