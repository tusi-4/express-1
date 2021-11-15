// rozwiązać problem z nodemon
const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');
const upload = multer({ dest: './public/data/uploads/' })

const app = express();

app.engine('.hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', {name: req.params.name});
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact/send-message', upload.single('file'), function (req, res) {
  const {author, sender, title, message} = req.body;
  if(author && sender && title && message && req.file){
    res.render('contact', {isSent: true, file: req.file.originalname});
  }
  else {
    res.render('contact', {isError: true});
  }
})

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});