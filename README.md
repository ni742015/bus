# bus
> A cli tool for koa Development just like vue-cli or create-react-app

Set up a koa server by just running one command. You can use Babel,Webpack,Swagger,Mongoose in you project with less config.

---
- [How to use](#how-to-use)
  - [Setup](#setup)
---

## How to use
### Setup

Install it:

```bash
npm install -g bus-core
bus init
// or
npx bus-core init

```

Init project:
```bash
cd yourproject
npm install
```

and edit the config file:src/config/index.js like this:
```
{
    port: 3000,
    mongodb: {
        url: `mongodb://test:test@mongoBaseUrl/test`
    }
}
```
and then just run npm run dev and go to http://localhost:3000
