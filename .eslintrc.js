module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	settings: {
		react: {
			version: 'detect'
		},
		'import/resolver': {
			node: {
				paths: ['src'],
				extensions: ['.js', '.jsx', '.ts', '.tsx']
			}
		}
	},
	env: {
		browser: true,
		amd: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:prettier/recommended' // Make sure this is always the last element in the array.
	],
	plugins: ['simple-import-sort', '@typescript-eslint', 'prettier'],
	rules: {
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error'],
		'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react/prop-types': 'off',
		'jsx-a11y/accessible-emoji': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'jsx-a11y/anchor-is-valid': [
			'error',
			{
				components: ['Link'],
				specialLink: ['hrefLeft', 'hrefRight'],
				aspects: ['invalidHref', 'preferButton']
			}
		]
	}
};
