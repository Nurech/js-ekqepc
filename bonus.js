// XOR function for two strings
function xor(str1, str2) {
  let result = '';
  for (let i = 0; i < str1.length; i++) {
    // in js ^ is XOR
    result += String.fromCharCode(str1.charCodeAt(i) ^ str2.charCodeAt(i));
  }
  return result;
}

// OTP function for encryption
function otpEncrypt(plainText, key) {
  return xor(plainText, key);
}

// Simulating OTP in CBC mode
function otpCbcEncrypt(plainText, key, iv) {
  let previousCipher = iv;
  let cipherText = '';

  // OTP encrypt with blocks
  for (let i = 0; i < plainText.length; i += iv.length) {
    let block = plainText.slice(i, i + iv.length);
    let xoredBlock = xor(block, previousCipher);
    let cipherBlock = otpEncrypt(xoredBlock, key.slice(i, i + iv.length));
    cipherText += cipherBlock;
    previousCipher = cipherBlock;
  }

  return cipherText;
}

// Let's take two messages m0 and m1
const m0 = 'Hello'; // 1st block
const m1 = 'World'; // 2nd block

// The adversary knows that either m0 or m1 has been encrypted

const key = 'supersecretkey'; // The key should be as long as the message in OTP
const iv = '12345'; // This should be known to both parties

console.log(`[BONUS] m0 string: ${m0}`);
console.log(`[BONUS] m1 string: ${m1}`);
console.log(`[BONUS] key: ${key}`);
console.log(`[BONUS] iv: ${iv}`);

// Let's say in our test, the challenger uses m0 followed by m1
console.log(`[BONUS] otpCbcEncrypt with: ${m0}+${m1} ${key} ${iv}`);
const cipherText = otpCbcEncrypt(m0 + m1, key, iv);

console.log(`[BONUS] CipherText: ${cipherText}`);

// Adversary's Attack:
// Encrypt m0 with the given IV and the first block of the key
const cipherM0 = otpEncrypt(xor(m0, iv), key.slice(0, iv.length));
console.log(`[BONUS] cipherM0: ${cipherM0}`);
console.log(
  `[BONUS] cipherText.slice(0, iv.length): ${cipherText.slice(0, iv.length)}`
);

// If the first block of ciphertext matches the calculated cipherM0, the adversary knows m0 has been encrypted first, otherwise m1.
if (cipherText.slice(0, iv.length) === cipherM0) {
  console.log('[BONUS] m0(1st block) has been encrypted.');
} else {
  console.log('[BONUS] m1(2nd block) has been encrypted.');
}
