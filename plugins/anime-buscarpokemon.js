import axios from 'axios';
import { createCanvas, loadImage } from 'canvas';

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    // Extrae el nombre del Pokémon del mensaje del usuario
    const pokemonName = m.text.split(' ')[1];  // Asume que el nombre del Pokémon sigue al comando

    if (!pokemonName) {
      return conn.reply(m.chat, 'Por favor, proporciona el nombre de un Pokémon para buscar.', m);
    }

    // Realiza las solicitudes a la PokeAPI
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}`);

    // Procesa el resultado
    const data = res.data;
    const speciesData = speciesRes.data;

    const nombrePokemon = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const tipo = data.types.map(type => type.type.name).join(', ');
    const altura = (data.height / 10).toFixed(2);  // Convertir altura a metros
    const peso = (data.weight / 10).toFixed(2);    // Convertir peso a kilogramos
    const imagen = data.sprites.front_default; // URL de la imagen PNG
    const biografia = speciesData.flavor_text_entries.find(entry => entry.language.name === 'es')?.flavor_text || 'No disponible';

    // Crea una imagen con canvas
    const canvas = createCanvas(800, 600); // Tamaño de la imagen
    const ctx = canvas.getContext('2d');

    // Carga la imagen del Pokémon
    const pokemonImage = await loadImage(imagen);
    ctx.drawImage(pokemonImage, 550, 20, 200, 200); // Ajusta la posición y tamaño de la imagen

    // Establece el estilo del texto
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText(`✨ *Información del Pokémon*`, 20, 30);
    ctx.font = '16px Arial';
    ctx.fillText(`🦠 *Nombre*: ${nombrePokemon}`, 20, 60);
    ctx.fillText(`🔮 *Tipo*: ${tipo}`, 20, 90);
    ctx.fillText(`📏 *Altura*: ${altura} m`, 20, 120);
    ctx.fillText(`⚖️ *Peso*: ${peso} kg`, 20, 150);
    ctx.fillText(`🌍 *Regiones*: ${speciesData.habitat ? speciesData.habitat.name : 'Desconocido'}`, 20, 180);
    ctx.fillText(`📍 *Ubicaciones*: ${speciesData.habitat ? speciesData.habitat.name : 'Desconocido'}`, 20, 210);
    ctx.fillText(`📜 *Biografía*: ${biografia.replace(/\f/g, ' ')}`, 20, 240);

    // Convierte el canvas a buffer
    const buffer = canvas.toBuffer('image/png');

    // Envía la imagen al chat
    conn.sendMessage(m.chat, { image: buffer, caption: 'Aquí está la información del Pokémon.' }, { quoted: m });
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Lo siento, no se pudo obtener la información del Pokémon. Asegúrate de que el nombre sea correcto.', m);
  }
};

// Configuración del comando
handler.command = ['buscarpokemon', 'findpokemon'];
handler.tags = ['pokemon'];
handler.help = ['buscarpokemon'];
handler.limit = true;

export default handler;
  
