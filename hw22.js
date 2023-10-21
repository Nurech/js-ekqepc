// Vigenere Cipher encryption function
function vigenereEncrypt(plainText, key) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let encryptedText = "";

  // Extend the key to match the length of the plainText
  while (key.length < plainText.length) {
      key += key;
  }

  // Encrypt using the Vigenere method
  for (let i = 0; i < plainText.length; i++) {
      let plainChar = plainText.charAt(i);
      let keyChar = key.charAt(i);
      
      let encryptedChar = alphabet.charAt(
      // % is modulus
          (alphabet.indexOf(plainChar) + alphabet.indexOf(keyChar)) % 26
      );
      encryptedText += encryptedChar;
  }

  return encryptedText;
}

// 1. Encrypt the message "THEWANDCHOOSESTHEWIZARD" with key "MAGIC"
let originalPlainText = "THEWANDCHOOSESTHEWIZARD";
let key = "MAGIC";
let encryptedText = vigenereEncrypt(originalPlainText, key);
console.log(`[2.1] Encrypted message: ${encryptedText}`);

// 2. Change one letter in the plainText and see how many letters of the ciphertext change
// ? Is the diffusion property achieved?
// Now WIZARD -> LIZARD
let modifiedPlainText = "THEWANDCHOOSESTHELIZARD";
let modifiedEncryptedText = vigenereEncrypt(modifiedPlainText, key);

let countChanged = 0;
for (let i = 0; i < encryptedText.length; i++) {
  if (encryptedText[i] !== modifiedEncryptedText[i]) {
      countChanged++;
      console.log(`[2.2] Letter ${encryptedText[i]} changed to ${modifiedEncryptedText[i]} at index ${i}`);
  }
}
console.log(`[2.2] modifiedPlainText: ${modifiedPlainText}`);
console.log(`[2.2] modifiedEncryptedText: ${modifiedEncryptedText}`);
console.log(`[2.2] letters changed: ${countChanged}`);
// Diffusion is not good, only one letter changed. Statistical properties have barely changed.


// 3. Change one letter in the key and see how many letters of the ciphertext change
// ? Is the confusion property achieved?
// Now MAGIC -> MANIC
let modifiedKey = "MANIC";
let encryptedTextWithModifiedKey = vigenereEncrypt(originalPlainText, modifiedKey);

countChanged = 0;
for (let i = 0; i < encryptedText.length; i++) {
  if (encryptedText[i] !== encryptedTextWithModifiedKey[i]) {
      countChanged++;
      console.log(`[2.3] Letter ${encryptedText[i]} changed to ${encryptedTextWithModifiedKey[i]} at index ${i}`);
  }
}
console.log(`[2.3] Key: ${key}`);
console.log(`[2.3] Encrypted with original key: ${encryptedText}`);
console.log(`[2.3] Modified key: ${modifiedKey}`);
console.log(`[2.3] Encrypted with modified key: ${encryptedTextWithModifiedKey}`);
console.log(`[2.3] Letters changed after modifying key: ${countChanged}`);
// Confusion is good as multiple characters in the ciphertext change when we modify just one character of the key.