# React + Redux + React-router + React-router-redux + redux-async-connect

## Super-awesome boilerplate to get you covered

# Core priniples

## Everthing that could be written in ES6 should be written in ES6

> becouse no one want to handle your mess of `var`'s `require`'s and ';'.

We did rewrite everything in es6. including server entries, babel configs, prerender.

## Everything that could be hot-reloaded shoul be hot-reloaded

> becouse who the fuck restarts servers and refreshes browsers in 2016?

Hot-reloading skyrocket our performance. So we write hot-reloading for everything: front-end, css,
and server prerender. Yes, you herd it right - we actully do prerender hot-swap.

## Everything should be easily debbuged

So we add source maps for everything, enable beatiful readable logging and add support for external dev tools.

## Every config should be readable

> becouse sometimes it feels like webpack configs was written by martians for martians.

Ever whitness `webpack.config` so large and complicated your eye twitched? We seen it too.
So here we designed every config to be readable and obvious, even in price of some code duplication.

## Every entry should be a standalone file

Did you ever debug 3 server environment build by single `buidl-server.js` swarmed by `if (options.prerender || !options.dev || process.env.NODE_ENV === 'production')`? So we rewrited every entry to be as clean as possible.

## Every line of code here should serve it purpose

> becouse some boilerplates so bloated, `npm install` runs forever and `git clone` eat's out my data plan for a week

Every line of code you will see here is essential. We did include some utils you `may` need, but thats it.

## Every piece of data that could (reasonably) stored in redux should be stored in redux

One store, one debug tool, replay and one interface to get data to your components.


Todo:

- [x] prerendering and browser entry points
- [x] redux for everything
- [x] .js compilation
- [x] .styl compilation
- [x] .static files compilation
- [x] Hot reloading on client
- [x] Hogan/mustache template by loader, not in runtime
- [x] Hot reloading express app without breaking HMR middleware https://github.com/glenjamin/ultimate-hot-reloading-example
- [x] expressive commands to run with color coding
- [ ] JWT middleware on react from
- [ ] Helmet with all smart meta-tags
- [x] Heroku/travis deploy
- [x] Whitescape sertified eslint
- [x] Make all globals that make sense accessible
- [x] Fix 404 :(