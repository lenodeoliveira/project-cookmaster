require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/userRoute');
const recipesRouter = require('./routes/recipesRoute');
const error = require('./middleware/error');

const app = express();

const PORT = 3000;
app.use(express.json());

app.use(express.static(`${__dirname}uploads/`));

app.use(userRouter);
app.use(recipesRouter);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(error);

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
