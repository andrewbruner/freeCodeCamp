function convertToRoman(num) {
  // handle edge cases
  if (typeof num != 'number' || num <= 0 || num > 3999) return 'invalid input';

  // create romans array
  const romans = [];

  // find the thousands place
  let thousands = Math.floor(num / 1000);
  // find the hundreds place
  let hundreds = Math.floor((num % 1000) / 100);
  // find the tens place
  let tens = Math.floor((num % 100) / 10);
  // find the ones place
  let ones = num % 10;

  // convert the thousands place
  let thousandsRoman = '';
  for (let i = 0; i < thousands; i++) {
    thousandsRoman += 'M';
  }
  romans.push(thousandsRoman);

  // convert the hundreds place
  let hundredsRoman = '';
  if (hundreds === 9) {
    hundredsRoman = 'CM';
  }
  else if (hundreds >= 5) {
    hundredsRoman = 'D';
    for (let i = 0; i < hundreds - 5; i++) {
      hundredsRoman += 'C';
    }
  }
  else if (hundreds === 4) {
    hundredsRoman = 'CD';
  }
  else {
    for (let i = 0; i < hundreds; i++) {
      hundredsRoman += 'C';
    }
  }
  romans.push(hundredsRoman);

  // convert the tens place
  let tensRoman = '';
  if (tens === 9) {
    tensRoman = 'XC';
  }
  else if (tens >= 5) {
    tensRoman = 'L';
    for (let i = 0; i < tens - 5; i++) {
      tensRoman += 'X';
    }
  }
  else if (tens === 4) {
    tensRoman = 'XL';
  }
  else {
    for (let i = 0; i < tens; i++) {
      tensRoman += 'X';
    }
  }
  romans.push(tensRoman);

  // convert the ones place
  let onesRoman = '';
  if (ones === 9) {
    onesRoman = 'IX';
  }
  else if (ones >= 5) {
    onesRoman = 'V';
    for (let i = 0; i < ones - 5; i++) {
      onesRoman += 'I';
    }
  }
  else if (ones === 4) {
    onesRoman = 'IV';
  }
  else {
    for (let i = 0; i < ones; i++) {
      onesRoman += 'I';
    }
  }
  romans.push(onesRoman);

  // return the roman numeral
  return romans.join('');
}

console.log(
  convertToRoman(2) == 'II',
  convertToRoman(3) == 'III',
  convertToRoman(4) == 'IV',
  convertToRoman(5) == 'V',
  convertToRoman(9) == 'IX',
  convertToRoman(12) == 'XII',
  convertToRoman(16) == 'XVI',
  convertToRoman(29) == 'XXIX',
  convertToRoman(44) == 'XLIV',
  convertToRoman(45) == 'XLV',
  convertToRoman(68) == 'LXVIII',
  convertToRoman(83) == 'LXXXIII',
  convertToRoman(97) == 'XCVII',
  convertToRoman(99) == 'XCIX',
  convertToRoman(400) == 'CD',
  convertToRoman(500) == 'D',
  convertToRoman(501) == 'DI',
  convertToRoman(649) == 'DCXLIX',
  convertToRoman(798) == 'DCCXCVIII',
  convertToRoman(891) == 'DCCCXCI',
  convertToRoman(1000) == 'M',
  convertToRoman(1004) == 'MIV',
  convertToRoman(1006) == 'MVI',
  convertToRoman(1023) == 'MXXIII',
  convertToRoman(2014) == 'MMXIV',
  convertToRoman(3999) == 'MMMCMXCIX'
);