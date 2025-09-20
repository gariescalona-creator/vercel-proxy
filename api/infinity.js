import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { archivo, nombre } = req.body;

  if (!archivo || !nombre) {
    return res.status(400).json({ error: 'Faltan datos: archivo y nombre son requeridos.' });
  }

  const targetUrl = `https://novedades.gt.tc/subir.php?archivo=${encodeURIComponent(nombre)}`;

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      body: archivo
    });

    const data = await response.text();
    console.log("Respuesta del servidor:", data);
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al conectar con el servidor destino' });
  }
}
