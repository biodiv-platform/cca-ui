# CCA UI

Community Conserved Areas UI

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![typed with TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://www.typescriptlang.org)
[![framework: nextjs](https://badgen.net/badge/framework/next.js)](https://nextjs.org)

### 📦 Getting Started

```sh
yarn install
cp src/configs/site-config.example.js src/configs/site-config.js  # setup with appropriate properties
yarn start # will start development server on port 3000
```

### 👷 Production Build

```sh
yarn build
yarn serve           # will start production server
```

### 📝 Generate TS Interfaces from Swagger UI

For end to end typesafe models this grately reduces chances of typos and amazing autocomplete ✨

```sh
./typegen.sh         # To regenerate modal(s) from microservices endpoints
```

### 📄 License

Apache-2.0 &copy; [Strand Life Sciences](https://github.com/strandls)
