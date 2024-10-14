import axios from 'axios';
import { BASE_URL } from '@env';

// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para manejar errores de la respuesta
const handleResponseError = (error: any) => {
  let errorMessage = "Ocurrió un error inesperado.";  // Mensaje genérico por defecto

  if (error.message === 'Network Error') {
    // Error de red (no hay respuesta del servidor)
    errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
  } else if (error.response) {
    // Si el servidor devuelve una respuesta
    if (error.response.data && error.response.data.message) {
      // Si el servidor envía un mensaje de error específico
      errorMessage = error.response.data.message;
    } else {
      // Si no hay un mensaje explícito del servidor
      switch (error.response.status) {
        case 404:
          errorMessage = 'El recurso solicitado no se encontró.';
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          errorMessage = 'Error del servidor. Inténtalo de nuevo más tarde.';
          break;
        default:
          errorMessage = `Ocurrió un error (${error.response.status}).`;
          break;
      }
    }
  }

  // Retorna el error con el mensaje apropiado
  return Promise.reject(new Error(errorMessage));
};

// Interceptor de respuesta
axiosInstance.interceptors.response.use(
  (response) => response,  // Respuesta exitosa
  (error) => handleResponseError(error)  // Llamada a la función de manejo de error
);

export default axiosInstance;
