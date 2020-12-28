import * as path from 'path';
import fs from 'fs';

function errorHandler() {
  return (err, req, res, next) => {
    if (err.status) res.statusCode = err.status;
    if (res.statusCode < 400) res.statusCode = 500;
    if ('test' !== process.env.NODE_ENV) console.error(err.stack);
    const accept = req.headers.accept || '';

    if (~accept.indexOf('html')) {
      fs.readFile(path.join(__dirname, '/../public/style.css'), 'utf8', (e1, style) => {
        fs.readFile(path.join(__dirname, '/../public/error.html'), 'utf8', (e2, html) => {
          const stack = (err.stack || '')
            .split('\n').slice(1)
            .map((v) => { return '' + v + ''; }).join('');
          html = html
            .replace('{style}', style)
            .replace('{stack}', stack)
            .replace('{title}', exports.title)
            .replace('{statusCode}', res.statusCode)
            .replace(/\{error\}/g, utils.escape(err.toString().replace(/\n/g, '')));
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(html);
        });
      });
      // json
    } else if (~accept.indexOf('json')) {
      const error = { message: err.message, stack: err.stack };
      for (let prop in err) error[prop] = err[prop];
      const json = JSON.stringify({ error: error });
      res.setHeader('Content-Type', 'application/json');
      res.end(json);
      // plain text
    } else {
      res.setHeader('Content-Type', 'text/plain');
      res.end(err.stack);
      next();
    }
  };
};

exports = module.exports = errorHandler;
