const serveConfig = {
  rewrites: [],
};

function handler(event) {
  var request = event.request;
  var response = event.response;
  var uri = request.uri;

  if (response.status !== '404') {
    return request;
  }

  function isMatch(pattern, path) {
    // Escape any special regex characters in the pattern
    const escapedPattern = pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    // Replace variable segments with a regex pattern that matches any non-slash characters
    const regexPattern = new RegExp(
      '^' + escapedPattern.replace(/\\:([^/]+)/g, '([^/]+)') + '$'
    );

    return regexPattern.test(path);
  }

  // handle rewrites
  for (var i = 0; i < serveConfig.rewrites.length; i++) {
    var rewrite = serveConfig.rewrites[i];
    if (isMatch(rewrite.source, uri)) {
      uri = rewrite.destination;
      request.uri = uri;
      break;
    }
  }

  // handle trailing slash, and redirect to html if no extension
  if (!uri.includes('.') && uri.length > 1) {
    if (uri.endsWith('/')) {
      request.uri = uri.replace(/\/?$/, '.html');
    } else {
      request.uri = uri + '.html';
    }
  }

  return request;
}
