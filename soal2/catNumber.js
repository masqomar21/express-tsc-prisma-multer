let rules = [
    { divisor: 3, output: "cat" },
    { divisor: 5, output: "kitty" },
    { divisor: 15, output: "catKitty" }
];

rules.sort((a, b) => b.divisor - a.divisor);

function addRule(divisor, output) {
    rules.push({ divisor, output });
    rules.sort((a, b) => b.divisor - a.divisor);
}

function customCatKitty(n) {
    for (let i = 1; i <= n; i++) {
        let result = "";
        rules.some(rule => {
            if (i % rule.divisor === 0) {
                result = rule.output; 
                return true; 
            }
        });
        console.log(result || i);
    }
}

addRule(13, "dog");

customCatKitty(100);
