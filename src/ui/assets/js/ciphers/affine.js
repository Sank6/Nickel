const alphabetLC = "abcdefghijklmnopqrstuvwxyz".split("");
const alphabetUC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const frequency = require("../tools/frequency.js");

const modInverse = (a) => {
  a = Number(a);
  if (Number.isNaN(a)) return NaN;
  a = ((a % 26) + 26) % 26;
  if (!a) return NaN;
  const s = [];
  let b = 26;
  while (b) {
    [a, b] = [b, a % b];
    s.push({ a, b });
  }
  if (a !== 1) return NaN;
  let x = 1;
  let y = 0;
  for (let i = s.length - 2; i >= 0; --i) {
    [x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)];
  }
  return ((y % 26) + 26) % 26;
}

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

module.exports.encrypt = ({ a, b }, body) => {
  a = Number(a);
  b = Number(b);
  
  if (a == NaN || b == NaN) return { success: false, error: "Invalid Key" };

  // Check if a has an inverse
  let inverseA = modInverse(a);
  if (!inverseA) return { success: false, error: "Invalid Key" }

  // Check if a and m are coprime
  if (gcd(a, b) !== 1) return { success: false, error: "Invalid Key" }

  let ciphertext = "";
  for (let character of body) {
    if (alphabetLC.includes(character))
      ciphertext += alphabetLC[(a * alphabetLC.indexOf(character) + b) % 26];
    else if (alphabetUC.includes(character))
      ciphertext += alphabetUC[(a * alphabetUC.indexOf(character) + b) % 26];
    else ciphertext += character;
  }
  return { success: true, ciphertext, plaintext: body };
};

module.exports.decrypt = ({ a, b }, body) => {
  a = Number(a);
  b = Number(b);
  
  if (a == NaN || b == NaN) return { success: false, error: "Invalid Key" };

  // Check if a has an inverse
  let inverseA = modInverse(a);
  if (!inverseA) return { success: false, error: "Invalid Key" }

  // Check if a and m are coprime
  if (gcd(a, b) !== 1) return { success: false, error: "Invalid Key" }

  let plaintext = "";
  for (let character of body) {
    if (alphabetLC.includes(character)) {
        let k = (inverseA * (alphabetLC.indexOf(character) - b)) % 26;
        if (k < 0) k = k + 26;
        plaintext += alphabetLC[k];
    }
    else if (alphabetUC.includes(character)) {
        let k = (inverseA * (alphabetUC.indexOf(character) - b)) % 26;
        if (k < 0) k = k + 26;
        plaintext += alphabetUC[k];
    }
    else plaintext += character;
  }

  return { success: true, plaintext, ciphertext: body };
};

module.exports.solve = (body) => {
  let decryptedBodies = []
  
  // Carry out each shift
  for (let a = 0; a < 25; a ++) {
    for (let b = 0; b < 25; b ++) {
      let decrypted = module.exports.decrypt({a, b}, body);
      if (!decrypted.success) continue;
      let freq = frequency(decrypted.plaintext);

      // Add the differences between the actual frequency of the letter and the expected frequency
      // of all the letters
      let sumDifferences = freq.map(x => x.actualFrequency.difference).reduce((a, b) => a + b);
      decryptedBodies.push({sumDifferences, plaintext: decrypted.plaintext, key: {a, b}});
    }
  }

  // Return the shift with the lowest difference
  let {plaintext, key} = decryptedBodies.sort((a, b) => {return a.sumDifferences - b.sumDifferences})[0];

  return {success: true, plaintext, ciphertext: body, key}
}
