const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('📬 Получен webhook:', req.body);
  res.status(200).send('Webhook приет успешно!');
});

app.get('/', (req, res) => {
  res.send('Webhook сървърът работи!');
});

app.listen(port, () => {
  console.log(`Сървърът слуша на порт ${port}`);
});