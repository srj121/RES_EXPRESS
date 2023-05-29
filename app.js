const express = require('express');
const app = express();
const multer = require('multer');
const cors = require("cors");
app.use(cors());

const upload = multer({dest: 'uploads/'});

app.post('/api/save-pdf', upload.single('pdf'), (req, res) => {
    
    res.sendStatus(200);
});

app.get('/api/download-pdf', (req, res) => {
    const filepath = 'uploads/'+req.fileame;
  
    res.download(filepath, 'convert.pdf', (error) => {
        if(error) {
            console.error('Failed to initiate the file download:', error);
            res.sendStatus(500);
        }
    });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});