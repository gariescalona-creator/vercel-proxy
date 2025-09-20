import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { archivo, nombre } = req.body;

  if (!archivo || !nombre) {
    return res.status(400).json({ error: 'Faltan datos: archivo y nombre son requeridos.' });
  }

  const targetUrl = `https://novedades.gt.tc/Novedades/subir.php?archivo=${encodeURIComponent(nombre)}`;

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: archivo
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al conectar con el servidor destino' });
  }
}
