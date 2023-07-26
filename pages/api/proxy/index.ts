import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      let data = req.body;
      // Si data es una cadena, parsear a objeto
      if (typeof data === 'string') {
        data = JSON.parse(data);
      } 

      const token = req.headers.authorization;  // Capturamos el token de autorización
      console.warn('Token de autorización:', token);
      console.warn('Datos a enviar:', data);


      const token_ripley = 'BASIC YmE5ZmVjNGNiZjMyOTg1OWJhNDNjOTY5OWVlYzc1MmI5M2UwMTk4ZTpkYjdkOWRhMGM1OTllNzJjOGYxMjdiNGM1MGY2NGVkZWJmZTlkNTI2'
      const response = await axios.post('https://st-learninglocker.ftsdn.com/data/xAPI/statements', data, {
        headers: { 'Authorization': token }  // Adjuntamos el token a la solicitud saliente
      });

      res.send(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al procesar la solicitud');
    }
  } else {
    // Manejo de otros métodos HTTP
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
