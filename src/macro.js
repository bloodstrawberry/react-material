const acorn = require("acorn");

function evaluateCondition(condition, context) {
  const ast = acorn.parse(condition, { ecmaVersion: "latest" });

  function evaluateNode(node) {
    if (node.type === "LogicalExpression") {
      const leftValue = evaluateNode(node.left);
      const rightValue = evaluateNode(node.right);

      if (node.operator === "||") { // or
        return leftValue || rightValue;
      } else if (node.operator === "&&") { // and
        return leftValue && rightValue;
      }
    } else if (node.type === "BinaryExpression") { // ==, != 
      const leftValue = evaluateNode(node.left);
      const rightValue = evaluateNode(node.right);

      if (node.operator === "==") { 
        return leftValue == rightValue;
      } else if (node.operator === "===") {
        return leftValue === rightValue;
      } else if (node.operator === "!=") {
        return leftValue != rightValue;
      } else if (node.operator === "!==") {
        return leftValue !== rightValue;
      } 
    } else if (node.type === "Identifier") {
      return context[node.name];
    } else if (node.type === "Literal") {
      return node.value;
    } else if (node.type === "UnaryExpression" && node.operator === "!") {
      return !evaluateNode(node.argument);
    }

    throw new Error("Unsupported node type: " + node.type);
  }

  return evaluateNode(ast.body[0].expression);
}

let tf = [true, false];

const condition =
  "(((condition1) && (condition2 or condition3))) == condition4";

for (let a = 0; a < 2; a++) {
  for (let b = 0; b < 2; b++) {
    for (let c = 0; c < 2; c++) {
      for (let d = 0; d < 2; d++) {
        let str = `(((${tf[a]}) && (${tf[b]} || ${tf[c]}))) == ${tf[d]} => `;

        const result = evaluateCondition(condition, {
          condition1: tf[a],
          condition2: tf[b],
          condition3: tf[c],
          condition4: tf[d],
        });

        console.log(str + result); 
      }
    }
  }
}
