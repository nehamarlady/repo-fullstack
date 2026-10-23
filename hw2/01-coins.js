/** Exercise 01 - Coins **/

const calculateChange = function calculateChange(amount) {
  //checking if the amount is  below or equal to 0 or  amountis greater than 100 and any other character
  if (typeof amount !== "number" || !Number.isFinite(amount)) {
    console.log("Error: the amount must be a valid number");
    return;
  }
  if (amount > 100) {
    console.log("Error: the number is too large");
    return;
  }
  if (amount <= 0) {
    console.log("Error: the amount is invalid");
    return;
  }
  //converting the amount to cents
  let cents = Math.round(amount * 100);
  //assigning each denomination for each value
  const denominations = [
    { name: "dollars", value: 100 },
    { name: "quarters", value: 25 },
    { name: "dime", value: 10 },
    { name: "nickel", value: 5 },
    { name: "penny", value: 1 },
  ];
  const result = [];
  // performing the calculation and printing value
  denominations.forEach((coin) => {
    const count = Math.floor(cents / coin.value);

    if (count > 0) {
      const coinName =
        count === 1
          ? coin.name
          : coin.name === "penny"
            ? "pennies"
            : `${coin.name}`;

      result.push(`${count} ${coinName}`);
      cents %= coin.value;
    }
  });

  console.log(result.length > 0 ? result.join(", ") : "0 coins");
};

// Sample test cases
calculateChange(4.62);
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
calculateChange(0.16);
// $0.16 ==> 1 dime, 1 nickel, 1 penny
calculateChange(150.11);
// $150.11 ==> Error: the number is too large

// Add additional test cases here
calculateChange(150);
calculateChange(0);
calculateChange("a");
calculateChange();
calculateChange(5.55);
