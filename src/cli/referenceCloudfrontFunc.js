const serveConfig = {
  rewrites: [],
};

function isMatch(pattern, path) {
  // Escape any special regex characters in the pattern except for the colon
  const escapedPattern = pattern.replace(/([.+?^=!:${}()|[\]/\\])/g, '\\$1');

  // Replace variable segments with a regex pattern that matches any non-slash characters
  const regexPattern = new RegExp(
    '^' + escapedPattern.replace(/\\:([^/]+)/g, '([^/]+)') + '$'
  );

  return regexPattern.test(path);
}

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // handle rewrites
  for (var i = 0; i < serveConfig.rewrites.length; i++) {
    var rewrite = serveConfig.rewrites[i];
    const doesMatch = isMatch(rewrite.source, uri);
    if (doesMatch) {
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
