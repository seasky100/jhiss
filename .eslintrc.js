module.exports = {
  root: true,
  // dev: {
  //   "jquery": true // 解决$报错
  // },
  env: {
    node: true,
    jquery: true 
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    "no-unused-vars":"off",
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "vue/max-attributes-per-line": 'off' //关闭template中对象的属性换行
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
