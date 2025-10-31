const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3015;

// CORS 設定
app.use(cors());

// 靜態檔案服務
// 主要掛載點：提供 /sprites/pokemon/1.png 這類路徑（建議使用這個作為正式對外路徑）
app.use('/sprites', express.static(path.join(__dirname, 'sprites')));

// 兼容更短路徑：/pokemon/1.png 也能存取，方便在上層反向代理加了 /sprites 前綴時避免重複
// 注意順序：先宣告 /sprites，再宣告根路徑，避免 /sprites/* 被根路徑解析到 sprites/sprites/*
app.use('/', express.static(path.join(__dirname, 'sprites')));

// 將 /sprites/sprites/* 301 重新導向到 /sprites/*，修正雙層 sprites 的舊連結
app.use('/sprites/sprites', (req, res) => {
  res.redirect(301, '/sprites' + req.path);
});

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
