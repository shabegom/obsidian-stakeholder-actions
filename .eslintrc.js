<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of 3223152 (Merge branch 'main' into typing-cleanup)
=======
>>>>>>> parent of af7b7cd (Merge pull request #20 from shabegom/add-eslint)
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of af7b7cd (Merge pull request #20 from shabegom/add-eslint)
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended', // Should be last
  ],
  rules: {},
};
<<<<<<< HEAD
=======
=======
>>>>>>> parent of 55bb7fd (Merge pull request #21 from shabegom/typing-cleanup)
=======
>>>>>>> parent of 55bb7fd (Merge pull request #21 from shabegom/typing-cleanup)
=======
>>>>>>> parent of 55bb7fd (Merge pull request #21 from shabegom/typing-cleanup)
module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
    }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
};
>>>>>>> parent of 55bb7fd (Merge pull request #21 from shabegom/typing-cleanup)
=======
};
>>>>>>> parent of 55bb7fd (Merge pull request #21 from shabegom/typing-cleanup)
=======
};
>>>>>>> parent of 55bb7fd (Merge pull request #21 from shabegom/typing-cleanup)
=======
};
>>>>>>> parent of 55bb7fd (Merge pull request #21 from shabegom/typing-cleanup)
=======
  plugins: ['prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Should be last
  ],
  rules: {
    'prettier/prettier': 'error',
  },
};
>>>>>>> parent of 3223152 (Merge branch 'main' into typing-cleanup)
=======
>>>>>>> parent of af7b7cd (Merge pull request #20 from shabegom/add-eslint)
