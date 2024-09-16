import axios from 'axios';

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    // Extrae el nombre del Pokémon del mensaje del usuario
    const pokemonName = m.text.split(' ')[1];  // Asume que el nombre del Pokémon sigue al comando

    if (!pokemonName) {
      return conn.reply(m.chat, 'Por favor, proporciona el nombre de un Pokémon para buscar.', m);
    }

    // Realiza la solicitud a la PokeAPI
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}`);

    // Procesa el resultado
    const data = res.data;
    const speciesData = speciesRes.data;
    
    const nombrePokemon = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const tipo = data.types.map(type => type.type.name).join(', ');
    const altura = data.height / 10;  // Convertir altura a metros
    const peso = data.weight / 10;    // Convertir peso a kilogramos
    const imagen = data.sprites.front_default; // URL de la imagen PNG
    const regiones = speciesData.habitat ? speciesData.habitat.name : 'Desconocido';
    const biografia = speciesData.flavor_text_entries.find(entry => entry.language.name === 'es')?.flavor_text || 'No disponible';
    
    // Enviar el resultado al chat
    const mensaje = `✨ *Información del Pokémon*:
🦠 *Nombre*: ${nombrePokemon}
🔮 *Tipo*: ${tipo}
📏 *Altura*: ${altura} m
⚖️ *Peso*: ${peso} kg
🌍 *Regiones*: ${regiones}
📍 *Ubicaciones*: ${speciesData.habitat ? speciesData.habitat.name : 'Desconocido'}
📜 *Biografía*: ${biografia.replace(/\f/g, ' ')}

![Imagen de ${nombrePokemon}](${imagen})`;

    conn.reply(m.chat, mensaje, m);
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
      
