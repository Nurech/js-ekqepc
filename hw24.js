// Table was given in task
const conversionTable = {
  A: '00000',
  B: '00001',
  C: '00010',
  D: '00011',
  E: '00100',
  F: '00101',
  G: '00110',
  H: '00111',
  I: '01000',
  J: '01001',
  K: '01010',
  L: '01011',
  M: '01100',
  N: '01101',
  O: '01110',
  P: '01111',
  Q: '10000',
  R: '10001',
  S: '10010',
  T: '10011',
  U: '10100',
  V: '10101',
  W: '10110',
  X: '10111',
  Y: '11000',
  Z: '11001',
};

/**
 * Permute bits of a binary string based on the provided key
 *
 * @param {string} bits - The binary string to permute
 * @param {Array<number>} key - The permutation key
 * @returns {string} The permuted binary string
 */
function permute(bits, key) {
  let permuted = '';
  for (let i = 0; i < key.length; i++) {
    permuted += bits[key[i] - 1];
  }
  return permuted;
}

/**
 * Encrypt a plaintext using the Output Feedback (OFB) mode
 *
 * @param {string} plaintext - The text to encrypt
 * @param {Array<number>} key - The permutation key
 * @param {string} iv - The initialization vector
 * @returns {string} The encrypted ciphertext in binary format
 */
function useOFB(plaintext, key, iv) {
  // Convert each character of the plaintext to its binary form using the conversion table
  let binaryPlaintextArr = plaintext
    .split('')
    .map((char) => conversionTable[char]);
  let binaryPlaintext = binaryPlaintextArr.join('');

  console.log(
    '[4] Binary Plaintext ' +
      'D: ' +
      binaryPlaintextArr[0] +
      ' O: ' +
      binaryPlaintextArr[1] +
      ' G: ' +
      binaryPlaintextArr[2]
  );

  let ciphertext = '';

  // We set prev iv to temp variable, becase previous permutation uses key for new permutation
  let tempIv = iv;

  // Process each 5-bit block of the binary plaintext
  for (let i = 0; i < binaryPlaintext.length; i += 5) {
    let block = binaryPlaintext.substring(i, i + 5);
    tempIv = permute(tempIv, key);
    console.log(`[4] After Permutation (using key): ${tempIv}`);

    // XOR the block with the permuted IV to get the encrypted block.
    let encryptedBlock = (parseInt(block, 2) ^ parseInt(tempIv, 2))
      .toString(2)
      .padStart(5, '0');
    console.log(
      `[4] XOR of Plaintext block: ${block} with iv: ${tempIv} and get EncBlock: ${encryptedBlock}`
    );
    ciphertext += encryptedBlock;
  }

  // Format the ciphertext for better readability
  const splitMessage = ciphertext.match(/.{1,5}/g).join(' '); // for pretty logging
  console.log('[4.1] Encrypted Ciphertext: ' + splitMessage);
  return ciphertext;
}

// Init
let plaintext = 'DOG';
let key = [4, 1, 3, 5, 2];
let iv = '01011';

let ciphertext = useOFB(plaintext, key, iv);

/**
 * Decrypt a ciphertext using the Output Feedback (OFB) mode
 *
 * @param {string} ciphertext - The text to decrypt
 * @param {Array<number>} key - The permutation key
 * @param {string} iv - The initialization vector
 * @returns {string} The decrypted plaintext in binary format
 */
function decryptOFB(ciphertext, key, iv) {
  let decryptedBinary = '';
  let tempIv = iv;

  for (let i = 0; i < ciphertext.length; i += 5) {
    let block = ciphertext.substring(i, i + 5);
    tempIv = permute(tempIv, key);
    // XOR
    let decryptedBlock = (parseInt(block, 2) ^ parseInt(tempIv, 2))
      .toString(2)
      .padStart(5, '0');
    decryptedBinary += decryptedBlock;
  }

  return decryptedBinary;
}

/**
 * Flip a specific bit in a binary string
 *
 * @param {string} binary - The binary string
 * @param {number} position - The position of the bit to flip (1-based index)
 * @returns {string} The modified binary string with the flipped bit
 */
function flipBit(binary, position) {
  let charAtPosition = binary.charAt(position - 1);
  let flippedChar = charAtPosition === '0' ? '1' : '0';
  return binary.substr(0, position - 1) + flippedChar + binary.substr(position);
}

// Question #2
let modifiedCiphertext2 = flipBit(ciphertext, 5);
let decryptedBinary2 = decryptOFB(modifiedCiphertext2, key, iv);
console.log(
  `[4.2] Modified Ciphertext by flipping 5-th bit: ${modifiedCiphertext2}`
);
console.log(
  `[4.2] Decrypted Binary for modified Ciphertext: ${decryptedBinary2}`
);

// Calculate how many bits in the plaintext get changed
let originalBinaryPlaintext = plaintext
  .split('')
  .map((char) => conversionTable[char])
  .join('');
let changedBits2 = [...decryptedBinary2].filter(
  (bit, index) => bit !== originalBinaryPlaintext[index]
).length;
console.log(`[4.2] originalBinaryPlaintext: ${originalBinaryPlaintext}`);
console.log(`[4.2] decryptedBinary2:        ${decryptedBinary2}`);
console.log(`[4.2] changedBits2: ${changedBits2}`);

// Question #3
let modifiedIv = '11011';
let decryptedBinary3 = decryptOFB(ciphertext, key, modifiedIv);
console.log(`[4.3] Decrypted Binary using modified IV: ${decryptedBinary3}`);

// Calculate how many bits in the plaintext get changed
let changedBits3 = [...decryptedBinary3].filter(
  (bit, index) => bit !== originalBinaryPlaintext[index]
).length;
console.log(`[4.3] decryptedBinary3:         ${decryptedBinary3}`);
console.log(`[4.3] originalBinaryPlaintext:  ${originalBinaryPlaintext}`);
console.log(`[4.3] Number of bits changed in plaintext for: ${changedBits3}`);
