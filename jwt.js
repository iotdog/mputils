module.exports = {
  Decode
}

function Decode(jwtStr) {
  var base64Url = jwtStr.split('.')[1];
  var base64Str = base64Url.replace('-', '+').replace('_', '/');
  var byteStr = utf8Base64Decode(base64Str);
  var json = JSON.parse(byteStr);
  return json;
}

function utf8Base64Decode(base64Str) {
  var str = '', bytes = decodeAsBytes(base64Str), length = bytes.length;
  var i = 0, followingChars = 0, b, c;
  while (i < length) {
    b = bytes[i++];
    if (b <= 0x7F) {
      str += String.fromCharCode(b);
      continue;
    } else if (b > 0xBF && b <= 0xDF) {
      c = b & 0x1F;
      followingChars = 1;
    } else if (b <= 0xEF) {
      c = b & 0x0F;
      followingChars = 2;
    } else if (b <= 0xF7) {
      c = b & 0x07;
      followingChars = 3;
    } else {
      throw 'not a UTF-8 string';
    }
    for (var j = 0; j < followingChars; ++j) {
      b = bytes[i++];
      if (b < 0x80 || b > 0xBF) {
        throw 'not a UTF-8 string';
      }
      c <<= 6;
      c += b & 0x3F;
    }
    if (c >= 0xD800 && c <= 0xDFFF) {
      throw 'not a UTF-8 string';
    }
    if (c > 0x10FFFF) {
      throw 'not a UTF-8 string';
    }
    if (c <= 0xFFFF) {
      str += String.fromCharCode(c);
    } else {
      c -= 0x10000;
      str += String.fromCharCode((c >> 10) + 0xD800);
      str += String.fromCharCode((c & 0x3FF) + 0xDC00);
    }
  }
  return str;
}

//base64解析字符
const BASE64_DECODE_CHAR = {
  'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8,
  'J': 9, 'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16,
  'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24,
  'Z': 25, 'a': 26, 'b': 27, 'c': 28, 'd': 29, 'e': 30, 'f': 31, 'g': 32,
  'h': 33, 'i': 34, 'j': 35, 'k': 36, 'l': 37, 'm': 38, 'n': 39, 'o': 40,
  'p': 41, 'q': 42, 'r': 43, 's': 44, 't': 45, 'u': 46, 'v': 47, 'w': 48,
  'x': 49, 'y': 50, 'z': 51, '0': 52, '1': 53, '2': 54, '3': 55, '4': 56,
  '5': 57, '6': 58, '7': 59, '8': 60, '9': 61, '+': 62, '/': 63, '-': 62,
  '_': 63
}

function decodeAsBytes(base64Str) {
  var v1, v2, v3, v4, bytes = [], index = 0, length = base64Str.length;
  if (base64Str.charAt(length - 2) === '=') {
    length -= 2;
  } else if (base64Str.charAt(length - 1) === '=') {
    length -= 1;
  }

  // 4 char to 3 bytes
  for (var i = 0, count = length >> 2 << 2; i < count;) {
    v1 = BASE64_DECODE_CHAR[base64Str.charAt(i++)];
    v2 = BASE64_DECODE_CHAR[base64Str.charAt(i++)];
    v3 = BASE64_DECODE_CHAR[base64Str.charAt(i++)];
    v4 = BASE64_DECODE_CHAR[base64Str.charAt(i++)];
    bytes[index++] = (v1 << 2 | v2 >>> 4) & 255;
    bytes[index++] = (v2 << 4 | v3 >>> 2) & 255;
    bytes[index++] = (v3 << 6 | v4) & 255;
  }

  // remain bytes
  var remain = length - count;
  if (remain === 2) {
    v1 = BASE64_DECODE_CHAR[base64Str.charAt(i++)];
    v2 = BASE64_DECODE_CHAR[base64Str.charAt(i++)];
    bytes[index++] = (v1 << 2 | v2 >>> 4) & 255;
  } else if (remain === 3) {
    v1 = BASE64_DECODE_CHAR[base64Str.charAt(i++)];
    v2 = BASE64_DECODE_CHAR[base64Str.charAt(i++)];
    v3 = BASE64_DECODE_CHAR[base64Str.charAt(i++)];
    bytes[index++] = (v1 << 2 | v2 >>> 4) & 255;
    bytes[index++] = (v2 << 4 | v3 >>> 2) & 255;
  }
  return bytes;
}