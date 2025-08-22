const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware за JSON
app.use(bodyParser.json());

// Масив за съхранение на всички заявки
const logs = [];

// Webhook endpoint – приема POST и GET
app.all('/webhook', (req, res) => {
  const data = {
    timestamp: new Date().toISOString(),
    method: req.method,      // GET или POST
    query: req.query,        // параметри от URL (ако GET)
    payload: req.body        // тяло (ако POST)
  };

  logs.push(data); // записваме в масива

  console.log('Получена заявка:', data);

  res.status(200).send(`${req.method} заявка приета успешно!`);
});

// 📜 Показване на всички получени заявки
app.get('/logs', (req, res) => {
  const html = `
    <html>
      <head>
        <title>Webhook Logs</title>
        <style>
          body { font-family: monospace; padding: 20px; background: #f4f4f4; }
          pre { background: white; padding: 15px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h2>Получени заявки:</h2>
        <pre>${JSON.stringify(logs, null, 2)}</pre>
      </body>
    </html>
  `;
  res.send(html);
});

// Старт на сървъра
app.listen(port, () => {
  console.log(`Сървърът работи на порт ${port}`);
});