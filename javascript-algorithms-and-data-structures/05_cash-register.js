function checkCashRegister(price, cash, cid) {
  // Define return object
  let obj = {
    status: '',
    change: [],
  };

  // Determine total cash in drawer
  let cidTotal = 0;
  for (let i = 0; i < cid.length; i++) {
    cidTotal += cid[i][1];
  }
  cidTotal = parseFloat(cidTotal.toFixed(2));

  // Determine change
  let change = cash - price;
  // Handle insufficient funds
  if (change > cidTotal) {
    obj.status = 'INSUFFICIENT_FUNDS';
    return obj;
  }

  // Handle exact change
  if (change === cidTotal) {
    obj.status = 'CLOSED';
    obj.change = cid;
    return obj;
  }

  // Handle change
  const val = {
    'ONE HUNDRED': 100,
    'TWENTY': 20,
    'TEN': 10,
    'FIVE': 5,
    'ONE': 1,
    'QUARTER': 0.25,
    'DIME': 0.1,
    'NICKEL': 0.05,
    'PENNY': 0.01,
  };

  let changeArr = [];
  // Starting with largest denomination...
  for (let i = cid.length - 1; i >= 0; i--) {
    // define innerChangeArr
    let innerChangeArr = [cid[i][0], 0];
    // While change is greater than or equal to current denomination...
    while (change >= val[cid[i][0]]) {
      // If there is at least one of the current denomination...
      if (cid[i][1] > 0) {
        // Reduce cid by one of current denomination...
        cid[i][1] -= val[cid[i][0]];
        // Reduce change by current denomination...
        change -= val[cid[i][0]];
        change = parseFloat(change.toFixed(2));
        // Add current denomination to innerChangeArr...
        innerChangeArr[1] += val[cid[i][0]];
      }
      else {
        break;
      }
    }
    // Add innerChangeArr to changeArr...
    if (innerChangeArr[1] > 0) {
      changeArr.push(innerChangeArr);
    }
  }

  // Handle insufficient funds (no exact change)
  if (change > 0) {
    obj.status = 'INSUFFICIENT_FUNDS';
    return obj;
  }

  // Handle returning change
  obj.status = 'OPEN';
  obj.change = changeArr;

  return obj;
}
