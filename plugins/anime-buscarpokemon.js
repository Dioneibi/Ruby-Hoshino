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
    const data = res.data;

    // Información básica
    const nombrePokemon = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const tipos = data.types.map(type => type.type.name).join(', ');
    const altura = (data.height / 10).toFixed(2);  // Convertir altura a metros
    const peso = (data.weight / 10).toFixed(2);    // Convertir peso a kilogramos
    const imagen = data.sprites.other['official-artwork'].front_default;  // Imagen HD

    // Información adicional (regiones, biografía)
    const speciesRes = await axios.get(data.species.url);
    const speciesData = speciesRes.data;
    const habitat = speciesData.habitat ? speciesData.habitat.name : 'Desconocido';

    // Obtener la biografía en español
    const biografia = speciesData.flavor_text_entries
      .find(entry => entry.language.name === 'es')
      ?.flavor_text || 'Biografía no disponible';

    // Prepara el mensaje de texto para el caption de la imagen
    const caption = `✨ *Información del Pokémon*:
🦠 *Nombre*: ${nombrePokemon}
🔮 *Tipo*: ${tipos}
📏 *Altura*: ${altura} m
⚖️ *Peso*: ${peso} kg
🌍 *Hábitat*: ${habitat}

📜 *Biografía*: ${biografia}`;

    // Envía la imagen con la información en el caption
    await conn.sendMessage(m.chat, { image: { url: imagen }, caption }, { quoted: m });

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
  
