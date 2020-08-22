function responseString(code, msg) {
  return {
    code: code,
    msg: msg,
  };
}

function cutLastPart(text) {
  let pattern = "Injection time";
  let parts = text.split(pattern);
  let length = parts.length;
  if (length >= 1) {
    return parts[0] + pattern + '\n' + parts[length - 1];
  }
  return text;
}

module.exports = { responseString, cutLastPart };
