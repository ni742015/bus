module.exports = {
  "env": {
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "parser": "babel-eslint",
  "extends": "eslint:recommended",
  "rules": {
    "comma-spacing": [2],
    "no-mixed-spaces-and-tabs": [0],
    "indent": [
      "error", "tab"
    ],
    "linebreak-style": [
      "error", "unix"
    ],
    "quotes": [
      "error", "single"
    ],
    "semi": [
      "error", "never"
		],
		"no-console": [1],
    'experimentalDecorators': 'off'
	}
};
