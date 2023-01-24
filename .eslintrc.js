module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/vue3-strongly-recommended',
		'@vue/airbnb',
		'@vue/typescript/recommended',
	],
	plugins: [
		'custom',
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'no-console': process.env.NODEENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODEENV === 'production' ? 'warn' : 'off',
		'custom/no-camel-case': 'error',
		'vuejs-accessibility/label-has-for': 'off',
		indent: ['error', 'tab'],
		'no-tabs': 'off',
		'import/no-cycle': 'off',
		'import/prefer-default-export': 'off',
		'prefer-rest-params': 'off',
		'@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
		'vue/max-attributes-per-line': ['error', {
			singleline: {
				max: 1,
			},
			multiline: {
				max: 1,
			},
		}],
		'vue/html-indent': [
			'error',
			'tab',
		],
		'no-plusplus': 'off',
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)',
			],
			env: {
				jest: true,
			},
		},
	],
};
