# Application Outline

## Purpose

The main purpose of our application is to measure certain cognitive and physical
abilities of different people. By offering several different tests and challenges, people
are able to determine how they fare compared to others in terms of proficiency in
various cognitive and physical tasks.

## Target Users

There isn’t a certain demographic of users that we are targeting, rather people from any
demographic are encouraged to use the application.Our web application appeals to
users of all ages ranging from children all the way to the elderly.

Children can use our application to not only test their cognitive skills, but also work to
improve these skills as well, serving as an effective learning tool. By developing
cognitive abilities from childhood, fundamental skills key to success in various
endeavors of life, such as problem solving, learning, information retention and decision
making are improved and enhanced.

On the contrary, the same can be said for the elderly or those who have impairments in
brain function. Unfortunately as people age, cognitive impairments such as dementia,
can be detrimental in both their quality of life and the lives of those around them.
The services our application can offer include testing for cognitive decline or impairment, as well as to improve those deficiencies.
Cognitive challenges can serve as a means to maintain and improve one’s cognitive
ability and brain function.

## Data Sources

- Auth0 for authentication
- SQLite for database

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## React router

Installed via the command `npm install react-router-dom`.
