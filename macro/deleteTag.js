const middleTrim = (str) => {
  const ret = str.replace(/\s+/g, " ");
  return ret.trim();
};

let str = "   blood   straw     berry        ";
console.log("|" + middleTrim(str) + "|");

const inputString = '   This   is   a    sample    string   with   multiple   spaces.   ';
const formattedString = middleTrim(inputString);
console.log(formattedString);