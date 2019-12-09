module.exports = {
  CRC32
}

function CRC32Table(reversedPolynomial) {
  var table = new Array()
  var i, j, n

  for (i = 0; i < 256; i++) {
    n = i
    for (j = 8; j > 0; j--) {
      if ((n & 1) == 1) {
        n = (n >>> 1) ^ reversedPolynomial
      } else {
        n = n >>> 1
      }
    }
    table[i] = n
  }

  return table
}

function CRC32(data) {
  let table = CRC32Table(0xEDB88320)
  let crc = 0xffffffff
  for (let i=0; i<data.length; i++) {
    crc = (crc >>> 8) ^ table[data[i] ^ (crc & 0x000000ff)]
  }
  crc = ~crc
  crc = (crc < 0) ? (0xffffffff + crc + 1) : crc
  return crc
}