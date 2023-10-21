// Use Vigenere Cipher encryption function as our 'pseudo-random' function
function F(key, message) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';

  // Extend the key to match the length of the message
  while (key.length < message.length) {
    key += key;
  }

  // Encrypt using the Vigenere method
  for (let i = 0; i < message.length; i++) {
    let messageChar = message.charAt(i);
    let keyChar = key.charAt(i);

    // % is modulus
    let resultChar = alphabet.charAt(
      (alphabet.indexOf(messageChar) + alphabet.indexOf(keyChar)) % 26
    );
    result += resultChar;
  }

  return result;
}

// Function from Task 3.1
function F1(k, m) {
  let n = m.length;
  return F(k, m) + '0'.repeat(n);
}

// Function from Task 3.2
function F2(k, m1, m2) {
  let n = m1.length;
  // XOR m2 with 0^n
  let m2XOR = m2
    .split('')
    .map((char, index) => {
      return String.fromCharCode(char.charCodeAt(0) ^ '0'.charCodeAt(0));
    })
    .join('');

  return F(k, m1) + F(k, m2XOR);
}

// Function from Task 3.3
function F3(k, m1, m2) {
  // XOR F(k, 0||m1) with F(k, m2||1)
  // || means contactenate and add 0 (join string)
  return F(k, '0' + m1)
    .split('')
    .map((char, index) => {
      return String.fromCharCode(
        char.charCodeAt(0) ^ F(k, m2 + '1').charCodeAt(index)
      );
    })
    .join('');
}

// Testing
let keySample = 'MAGIC';
let message1 = 'THEWAND';
let message2 = 'CHOOSER';

console.log(`[3.1] Using F'(k, m) = F(k, m)||0^n`);
console.log(`[3.1] Message: ${message1}`);
console.log(`[3.1] Key: ${keySample}`);
console.log(`[3.1] Result: ${F1(keySample, message1)}`); //Result: FHKECZD0000000

console.log(`[3.2] Using F'(k, m1||m2) = F(k, m1)||F(k, m2 ⊕ 0^n)`);
console.log(`[3.2] Message 1: ${message1}`);
console.log(`[3.2] Message 2: ${message2}`);
console.log(`[3.2] Key: ${keySample}`);
console.log(`[3.2] Result: ${F2(keySample, message1, message2)}`); //Result: FHKECZDLFHBL

console.log(`[3.3] Using F'(k, m1||m2) = F(k, 0||m1) ⊕ F(k, m2||1)`);
console.log(`[3.3] Message 1: ${message1}`);
console.log(`[3.3] Message 2: ${message2}`);
console.log(`[3.3] Key: ${keySample}`);
console.log(`[3.3] Result: ${F3(keySample, message1, message2)}`); // Result: 
