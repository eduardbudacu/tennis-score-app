import app from './server';

const hostname = '0.0.0.0';
const port = 8080;

app.listen(port, hostname, () => {
    console.log(`Server started http://${hostname}:${port}`);
});