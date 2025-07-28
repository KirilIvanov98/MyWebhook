const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Позволява да четем JSON от тялото на заявките
app.use(bodyParser.json());

// Масив за съхранение на получените webhook-и
const logs = [];

// Webhook endpoint
app.post('/webhook', (req, res) => {
  const data = {
    timestamp: new Date().toISOString(),
    payload: req.body
  };

  logs.push(data); // Записваме заявката в масива

  console.log('Получен webhook:', data);
  res.status(200).send('Webhook приет успешно!');
});

// Показване на всички получени webhook заявки
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
        <h2>Получени webhook заявки:</h2>
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
