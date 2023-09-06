module.exports = {
  // Определяем окружение, для которого будут применяться правила ESLint.
  env: {
    browser: true, // Для браузерного окружения.
    commonjs: true, // Для среды CommonJS (Node.js).
    es2021: true, // Для поддержки ECMAScript 2021.
  },
  // Используем настройки из расширения "airbnb-base".
  extends: 'react-app',
  // Определяем параметры парсера JavaScript.
  parserOptions: {
    ecmaVersion: 'latest', // Используйте необходимую версию ECMAScript.
    sourceType: 'module', // Если вы используете модульную систему (например, ES modules).
  },
  // Определяем правила ESLint.
  rules: {
    // Разрешить использование глобальных переменных, которые часто используются в браузере.
    'no-undef': 'error',
    // Запретить неиспользуемые переменные.
    'no-unused-vars': 'error',
    // Запретить использование функций, не имеющих return.
    'consistent-return': 'error',
    // Запретить использование функций, которые могут быть определены позже в коде (hoisting).
    'no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],
    // Запретить использование alert, confirm и prompt в браузерном коде.
    'no-alert': 'error',
  },
  settings: {
    react: {
      pragma: 'React', // Позволяет ESLint распознавать JSX синтаксис в файлах .js.
    },
  },
  ignorePatterns: ['build/'],
};
