function palindrome(str) {
  let fwd = str.replace(/\W|_/g, '').toLowerCase();
  let rev = Array.from(fwd).reverse().join('');
  return fwd == rev;
}
