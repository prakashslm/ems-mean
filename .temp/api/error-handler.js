exports = module.exports = function errorHandler() {
  return function errorHandler(err, req, res, next) {
    if (err.status) res.statusCode = err.status;
    if (res.statusCode < 400) res.statusCode = 500;
    if ('test' != env) console.error(err.stack);
    var accept = req.headers.accept || '';
    // html
    if (~accept.indexOf('html')) {
      fs.readFile(__dirname + '/../public/style.css', 'utf8', function (e, style) {
        fs.readFile(__dirname + '/../public/error.html', 'utf8', function (e, html) {
          var stack = (err.stack || '')
            .split('\n').slice(1)
            .map(function (v) { return '' + v + ''; }).join('');
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
      var error = { message: err.message, stack: err.stack };
      for (var prop in err) error[prop] = err[prop];
      var json = JSON.stringify({ error: error });
      res.setHeader('Content-Type', 'application/json');
      res.end(json);
      // plain text
    } else {
      res.setHeader('Content-Type', 'text/plain');
      res.end(err.stack);
    }
  };
};
