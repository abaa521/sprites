const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3015;

// CORS 設定
app.use(cors());

// 靜態檔案服務
app.use('/sprites', express.static(path.join(__dirname, 'sprites')));

// 根路徑回應
app.get('/', (req, res) => {
  res.json({
    message: 'Pokemon Sprites Server',
    version: '1.0.0',
    endpoints: {
      badges: '/sprites/badges',
      items: '/sprites/items',
      pokemon: '/sprites/pokemon',
      types: '/sprites/types'
    }
  });
});

// 健康檢查
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Pokemon Sprites Server running on port ${PORT}`);
});
