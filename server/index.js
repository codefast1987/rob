const express = require('express');
const app = express();

app.use(express.static('app/build'));

app.listen(process.env.PORT || 3000, (data) => {
  console.log(`Listening on ${process.env.PORT}`);
});
