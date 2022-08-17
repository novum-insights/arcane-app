import { handler } from './build/handler.js';
import express from 'express';
import herokuSSLRedirect from 'heroku-ssl-redirect'
const sslRedirect = herokuSSLRedirect.default
const app = express();
app.use(sslRedirect());
app.get('/healthcheck', (req, res) => {
    res.end('ok');
});
app.use(handler);
app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log(`listening on port ${process.env.PORT || 3000}`);
});