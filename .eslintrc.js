module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "plugins": ["jest"],
    "extends": ["standard", "plugin:jest/recommended"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "no-var": "error"
    }
};
