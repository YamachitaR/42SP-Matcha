import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['node_modules', 'dist', 'coverage'], // Ignorar arquivos desnecessários
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  pluginJs.configs.recommended, // Regras padrão do JavaScript
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs['recommended'].rules, // 🔹 Convertendo para Flat Config
      semi: ['error', 'always'], // Exige ponto e vírgula
      indent: ['error', 2], // Identação de 2 espaços
      '@typescript-eslint/no-unused-vars': ['warn'], // Alerta para variáveis não usadas
      '@typescript-eslint/explicit-function-return-type': 'off', // Não exige definir tipos de retorno sempre
      'no-console': 'warn', // Alerta sobre uso de console.log
      eqeqeq: ['error', 'always'], // Exige uso de === e !==
    },
  },
];
