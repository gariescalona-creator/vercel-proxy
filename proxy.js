import fetch from 'node-fetch';

export default async function handler(req, res) {
  const targetUrl = 'http://gjea.atwebpages.com/Novedades/upload2.php';

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: req.headers,
      body: req.body,
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al conectar con el servidor destino' });
  }
}
