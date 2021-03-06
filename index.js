const postcss = require('postcss');
const create = require('bem-tools-create');

module.exports = function(css, level, tech) {
    const ast = postcss.parse(css);

    const result = new Promise((resolve, reject) => {
        ast.walkRules(rule => {
            const selector = rule.selector;
            if (!selector.startsWith('.') || selector.includes(',')) return;

            const entity = selector.substr(1);

            create([entity], [level], tech, { fileContent: rule.toString() })
                .then(resolve)
                .catch(reject);
        });
    });
};
