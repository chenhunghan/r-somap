module.exports = {
    "env": {
      "jest/globals": true,
      "es6": true
    },
    "extends": [
      "airbnb-base",
      "plugin:flowtype/recommended"
    ],
    "plugins": [
        "import",
        "flowtype",
        "jest",
        "fp"
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
      "fp/no-arguments": "error",
      "fp/no-class": "error",
      "fp/no-delete": "error",
      "fp/no-events": "error",
      "fp/no-get-set": "error",
      "fp/no-let": "error",
      "fp/no-loops": "error",
      "fp/no-mutating-assign": "error",
      "fp/no-mutating-methods": "error",
      "fp/no-mutation": "error",
      "fp/no-nil": 0,
      "fp/no-proxy": "error",
      "fp/no-rest-parameters": "error",
      "fp/no-this": "error",
      "fp/no-throw": 0,
      "fp/no-unused-expression": 0,
      "fp/no-valueof-field": "error",
      "fp/no-let": 0,
      "no-var": "error"
    }
};
