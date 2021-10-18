function telephoneCheck(str) {

  /**
   * ^                 - start of string
   * (1\s?)?           - ('1' + optional space) optional
   * (\(\d{3}\)|\d{3}) - '(' + 3 digits + ')' OR 3 digits
   * (\s|-)?           - (space OR dash) optional
   * (\d{3})           - 3 digits
   * (\s|-)?           - (space OR dash) optional
   * (\d{4})           - 4 digits
   * $                 - end of string
   */

  let regex = /^(1\s?)?(\(\d{3}\)|\d{3})(\s|-)?(\d{3})(\s|-)?(\d{4})$/;

  return regex.test(str);
}