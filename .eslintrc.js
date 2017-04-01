module.exports = {
    "env": {
      "jest/globals": true
    },
    "extends": [
      "airbnb-base",
      "plugin:flowtype/recommended"
    ],
    "plugins": [
        "import",
        "flowtype",
        "jest"
    ],
    "rules": {
      "no-plusplus": "error",
      "max-len": 0,
      "no-tabs": 0,
      "no-mixed-operators": 0,
      "no-mixed-spaces-and-tabs": 0,
      "import/prefer-default-export": 0,
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
    }
};
