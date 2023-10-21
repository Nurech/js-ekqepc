function feistelRound(left, right, key, i) {
  // round Func F(k, x) = k ^ x
  function F(k, x) {
    return k ^ x;
  }

  // make new key
  let nextKey = key ^ (i + 1);

  // use round F, left XOR with function F
  let newRight = left ^ F(right, key);
  let newLeft = right;

  return [newLeft, newRight, nextKey];
}

let message = '0110100110101111';
let key = parseInt('01011001', 2); // init k0
let left = parseInt(message.substring(0, 8), 2); // halft left "01101001________"
let right = parseInt(message.substring(8), 2); // half right "________10101111"

// do 6 round s of feistel
for (let i = 0; i < 6; i++) {
  [left, right, key] = feistelRound(left, right, key, i);
  let message =
    left.toString(2).padStart(8, '0') + right.toString(2).padStart(8, '0');
  const splitMessage = message.match(/.{1,4}/g).join(' '); // for pretty logging
  console.log('[1] iteration ' + i + ' is: ' + splitMessage);
}

// cobmine two halves of the Enc message
// take int, make into binary add left right binary together into one string
// pad makes sure we get at least 8 bits, if sum is shorter than 8 bits then 0's are added to the left as filling
let encryptedMessage =
  left.toString(2).padStart(8, '0') + right.toString(2).padStart(8, '0');
const splitMessage = encryptedMessage.match(/.{1,4}/g).join(' '); // for pretty logging
console.log('[1] answer is: ' + splitMessage); // answer is: "0110 1100 1010 1000"
