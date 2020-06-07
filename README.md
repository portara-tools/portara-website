# Portara Web

Signing up for an account through GitHub at www.portara.io let's you control your Portara tool (www.npmjs.com/portara) through an online GUI. This can be beneficial if settings need to change without re-deploying an application.

## How to get started

1. If you haven't downloaded the Portara tool yet, you can find it here www.npmjs.com/portara
2. Go to www.portara.io and login with GitHub
3. After being redirected to an account page, you will receive a unique user token. This code should be used as an argument when setting up the Portara schema directive.
```javascript
import portara from 'portara';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    portara: portara("ENTER YOUR TOKEN HERE")
  }
})
```
4. Once the server is started, there's a direct connection to the website and your account. All the settings you have applied in your typeDefs can now be altered online.


