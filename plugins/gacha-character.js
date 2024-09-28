import fs from 'fs';

const obtenerDatos = () => {
  return fs.existsSync('data.json') 
    ? JSON.parse(fs.readFileSync('data.json', 'utf-8')) 
    : {'usuarios': {}, 'personajesReservados': []};
};

const obtenerPersonajes = () => {
  return fs.existsSync('./src/JSON/characters.json') 
    ? JSON.parse(fs.readFileSync('./src/JSON/characters.json', 'utf-8')) 
    : [];
};

let handler = async (message, {conn, text}) => {
  if (!text) {
    conn.reply(message.chat, '《✧》Por favor, proporciona el nombre del personaje que deseas ver.\n> ✎ Ejemplo: #character Yaemori', message);
    return;
  }

  const verificarValidez = () => {
    try {
      const data = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
      if (data.name !== 'Ruby-Hoshino') return false;
      if (data.repository.url !== 'git+https://github.com/Dioneibi/Ruby-Hoshino.git') return false;
      return true;
    } catch (error) {
      console.error('✧ Error al leer package.json:', error);
      return false;
    }
  };

  if (!verificarValidez()) {
    await conn.sendMessage(message.chat, '✧ Este comando solo es disponible en Ruby-Hoshino\n◇ https://github.com/Dioneibi/Ruby-Hoshino', message, rcanal);
    return;
  }

  const sender = message.sender;
  const characterName = text.trim().toLowerCase();
  const datos = obtenerDatos();
  const personajes = obtenerPersonajes();

  if (!datos.usuarios[sender] || !datos.usuarios[sender].personajes.some(p => p.name.toLowerCase() === characterName)) {
    conn.reply(message.chat, `《✧》No tienes el personaje ${characterName} en tu inventario.`, message);
    return;
  }

  const personaje = datos.usuarios[sender].personajes.find(p => p.name.toLowerCase() === characterName);
  if (!personaje) {
    conn.reply(message.chat, `《✧》No se encontró información para el personaje ${characterName}.`, message);
    return;
  }

  const caption = `《✧》Este es tu personaje.\n *${personaje.name}*\nSu valor es: ${personaje.value} RwCoins.`;
  await conn.sendMessage(message.chat, {
    image: { url: personaje.url },
    caption: caption,
    mimetype: 'image/jpeg'
  });
};

handler.help = ['gacha'];
handler.tags = ['gacha'];
handler.command = ['character'];
handler.register = true;

export default handler;
