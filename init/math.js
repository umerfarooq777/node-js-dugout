//======================== method 1
// functions has names

function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}
module.exports = { add, sub };

//======================== method 2
// anonymous functions
// exports.add = (a,b) => a+b;
// exports.sub = (a,b) => a-b;
