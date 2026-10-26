// src/services/movieService.js
import axios from 'axios';

// URL de la API pública de películas del ejemplo
const API_URL = 'https://reactnative.dev/movies.json';

export const fetchMovies = async () => {
  try {
    // Haces la petición GET con axios
    const response = await axios.get(API_URL);
    
    // Axios guarda la respuesta automáticamente en .data
    return response.data.movies ?? [];
  } catch (error) {
    console.error('Error al obtener las películas:', error);
    throw new Error('No se pudo conectar con el servidor');
  }
};