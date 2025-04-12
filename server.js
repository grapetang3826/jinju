const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = 'e06ab430-6ac5-49c0-b27a-f50f4c713c00';
const API_URL = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';

app.post('/api/summarize', async (req, res) => {
  try {
    const { text } = req.body;
    
    const response = await axios.post(API_URL, {
      model: 'ep-20250329175740-sqphz',
      messages: [
        {
          role: 'system',
          content: '使用一个金句总结全文最核心的内容'
        },
        {
          role: 'user',
          content: text
        }
      ],
      stream: false,
      temperature: 0.6
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      timeout: 60000
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    const aiResponse = response.data;
    res.json({
      choices: [{
        message: {
          content: aiResponse.choices[0].message.content
        }
      }]
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: '请求失败，请稍后重试' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});