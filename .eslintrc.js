module.exports = {
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:ava/recommended",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module",
    "ecmaFeatures": {
      "globalReturn": true,
      "impliedStrict": true,
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  "plugins": [
    "ava",
    "flowtype",
    "import",
    "jsx-a11y",
    "react"
  ],
  "settings": {
    "import/cache": {
      "lifetime": 5
    },
    "import/ignore": [
      "node_modules",
      "\\.(styl|svg|jpe?g|png)$"
    ],
    "import/resolver": {
      "webpack": {
        "config": "./webpack-configs/browser.development.babel.js"
      }
    },
    "react": {
      "version": "15.3.1"
    }
  },
  "env": {
    "commonjs": true,
    "es6": true,
    "shared-node-browser": true
  },
  "globals": {
    "__non_webpack_require__": false,
    "__PRERENDER__": false,
    "__UC_PUB_KEY__": false,
    "__FB_APP_ID__": false,
    "__VK_APP_ID__": false,
    "__YA__": false,
    "__GA__": false,
    "__GA_MODE__": false,
    "__BACKEND__": false,
    "__BASE_URL__": false,
    "__SENTRY_DSN__": false,
    "__RELEASE__": false,
    "__RECAPTCHA_PUBLIC_KEY__": false,
    "fetch": false,

    "__dirname": false,
    "document": false,
    "navigator": false,
    "process": false,
    "window": false
  },
  "rules": {
    "array-bracket-spacing": "error",
    "array-callback-return": "error",
    "arrow-body-style": "error",
    "arrow-parens": ["off", "as-needed"],
    "arrow-spacing": "error",
    "block-scoped-var": "error",
    "block-spacing": "error",
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    "camelcase": ["error", { "properties": "never" }],
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": "error",
    "comma-style": "error",
    "complexity": ["error", 5],
    "computed-property-spacing": "error",
    "consistent-return": "error",
    "consistent-this": "error",
    "curly": ["error", "multi-line", "consistent"],
    "default-case": "error",
    "dot-location": ["error", "property"],
    "dot-notation": "error",
    "eol-last": "error",
    "eqeqeq": ["error", "allow-null"],
    "func-names": "error",
    "func-name-matching": "off",
    "func-style": ["error", "declaration", { "allowArrowFunctions": true }],
    "guard-for-in": "error",
    "handle-callback-err": "error",
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "jsx-quotes": "error",
    "key-spacing": "error",
    "keyword-spacing": "error",
    "linebreak-style": "error",
    "max-depth": "error",
    "max-params": ["error", 5],
    "max-nested-callbacks": ["error", 3],
    "max-statements": ["error", 15],
    "max-statements-per-line": "error",
    "multiline-ternary": "off",
    "new-cap": "off",
    "new-parens": "error",
    "newline-after-var": "off",
    "newline-per-chained-call": "error",
    "no-alert": "error",
    "no-array-constructor": "error",
    "no-bitwise": "error",
    "no-caller": "error",
    "no-div-regex": "error",
    "no-else-return": "error",
    "no-empty-function": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-floating-decimal": "error",
    "no-implicit-coercion": "error",
    "no-implicit-globals": "error",
    "no-implied-eval": "error",
    "no-iterator": "error",
    "no-label-var": "error",
    "no-labels": ["error", { "allowLoop": true }],
    "no-lone-blocks": "error",
    "no-lonely-if": "error",
    "no-loop-func": "error",
    "no-mixed-operators": "error",
    "no-mixed-requires": ["error", { "grouping": true }],
    "no-multi-spaces": "error",
    "no-multi-str": "error",
    "no-multiple-empty-lines": ["error", { "max": 2 }],
    "no-negated-condition": "error",
    "no-nested-ternary": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-object": "error",
    "no-new-require": "error",
    "no-new-symbol": "error",
    "no-new-wrappers": "error",
    "no-octal-escape": "error",
    "no-path-concat": "error",
    "no-param-reassign": "error",
    "no-proto": "error",
    "no-prototype-builtins": "error",
    "no-return-assign": "error",
    "no-script-url": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-shadow": "error",
    "no-shadow-restricted-names": "error",
    "no-spaced-func": "error",
    "no-throw-literal": "error",
    "no-trailing-spaces": "error",
    "no-undef-init": "error",
    "no-unmodified-loop-condition": "error",
    "no-unneeded-ternary": "error",
    "no-unused-expressions": "error",
    "no-use-before-define": ["error", "nofunc"],
    "no-useless-call": "error",
    "no-useless-computed-key": "error",
    "no-useless-concat": "error",
    "no-useless-constructor": "error",
    "no-useless-escape": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "no-void": "error",
    "no-with": "error",
    "no-whitespace-before-property": "error",
    "object-curly-spacing": "error",
    "object-shorthand": "error",
    "one-var-declaration-per-line": "error",
    "operator-assignment": "error",
    "operator-linebreak": "error",
    "padded-blocks": ["error", "never"],
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "quote-props": ["error", "as-needed", { "numbers": true }],
    "quotes": ["error", "single", "avoid-escape"],
    "radix": "error",
    "rest-spread-spacing": "error",
    "semi": ["error", "never"],
    "semi-spacing": "error",
    "space-before-blocks": "error",
    "space-before-function-paren": ["error", { "anonymous": "never", "named": "never", "asyncArrow": "always" }],
    "space-in-parens": "error",
    "space-infix-ops": "error",
    "space-unary-ops": "error",
    "spaced-comment": ["error", "always", { "block": { "balanced": true } }],
    "strict": ["error", "never"],
    "template-curly-spacing": "error",
    "unicode-bom": "error",
    "vars-on-top": "error",
    "wrap-iife": ["error", "inside"],
    "wrap-regex": "error",
    "yield-star-spacing": "error",
    "yoda": "error",
    "ava/assertion-arguments": ["error", { "message": "always" }],
    "ava/no-cb-test": "error",
    "ava/no-todo-test": "error",
    "ava/test-title": ["error", "always"],
    "flowtype/boolean-style": "error",
    "flowtype/define-flow-type": "error",
    "flowtype/delimiter-dangle": ["error", "only-multiline"],
    "flowtype/generic-spacing": "error",
    "flowtype/no-dupe-keys": "error",
    "flowtype/no-weak-types": "off", // too many errors for now
    "flowtype/require-parameter-type": "off",
    "flowtype/require-return-type": "off",
    "flowtype/require-valid-file-annotation": "error",
    "flowtype/semi": ["error", "never"],
    "flowtype/sort-keys": "off",
    "flowtype/space-after-type-colon": "error",
    "flowtype/space-before-generic-bracket": "error",
    "flowtype/space-before-type-colon": "error",
    "flowtype/type-id-match": "off",
    "flowtype/union-intersection-spacing": "error",
    "flowtype/use-flow-type": "error",
    "flowtype/valid-syntax": "error",
    "import/default": "error",
    "import/export": "error",
    "import/extensions": ["error", {
      "js": "never"
    }],
    "import/first": "error",
    "import/imports-first": "error",
    "import/max-dependencies": "off",
    "import/named": "error",
    "import/namespace": "error",
    "import/newline-after-import": "error",
    "import/no-absolute-path": "error",
    "import/no-amd": "error",
    "import/no-deprecated": "error",
    "import/no-duplicates": "error",
    "import/no-dynamic-require": "error",
    "import/no-commonjs": "error",
    "import/no-extraneous-dependencies": "error",
    "import/no-internal-modules": "off",
    "import/no-mutable-exports": "error",
    "import/no-named-as-default": "error",
    "import/no-named-as-default-member": "error",
    "import/no-namespace": "off",
    "import/no-nodejs-modules": "off",
    "import/no-unassigned-import": "off",
    "import/no-webpack-loader-syntax": "error",
    "import/prefer-default-export": "off",
    "import/no-restricted-paths": "error",
    "import/no-unresolved": "error",
    "import/order": ["error", {
      "groups": [
        "builtin",
        "external",
        "internal",
        "parent",
        "sibling",
        "index"
      ],
      "newlines-between": "never"
    }],
    "import/unambiguous": "off",
    "jsx-a11y/anchor-has-content": "error",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/aria-proptypes": "error",
    "jsx-a11y/aria-role": "error",
    "jsx-a11y/aria-unsupported-elements": "error",
    "jsx-a11y/click-events-have-key-events": "off", // TODO: enable it later, when have time
    "jsx-a11y/heading-has-content": "error",
    "jsx-a11y/href-no-hash": "error",
    "jsx-a11y/html-has-lang": "error",
    "jsx-a11y/img-has-alt": "error",
    "jsx-a11y/img-redundant-alt": "error",
    "jsx-a11y/label-has-for": "error",
    "jsx-a11y/lang": "error",
    "jsx-a11y/mouse-events-have-key-events": "error",
    "jsx-a11y/no-access-key": "error",
    "jsx-a11y/no-marquee": "error",
    "jsx-a11y/no-onchange": "error",
    "jsx-a11y/no-static-element-interactions": "off", // TODO: enable it later, when have time
    "jsx-a11y/onclick-has-focus": "error",
    "jsx-a11y/onclick-has-role": "error",
    "jsx-a11y/role-has-required-aria-props": "error",
    "jsx-a11y/role-supports-aria-props": "error",
    "jsx-a11y/scope": "error",
    "jsx-a11y/tabindex-no-positive": "error",
    "react/forbid-component-props": "off",
    "react/forbid-prop-types": "off",
    "react/jsx-boolean-value": "error",
    "react/jsx-closing-bracket-location": "error",
    "react/jsx-curly-spacing": "error",
    "react/jsx-equals-spacing": "error",
    "react/jsx-first-prop-new-line": ["error", "multiline"],
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
    "react/jsx-handler-names": "error",
    "react/jsx-indent-props": ["error", 2],
    "react/jsx-indent": ["error", 2],
    "react/jsx-key": "error",
    "react/jsx-max-props-per-line": "off",
    "react/jsx-no-bind": "off",
    "react/jsx-no-comment-textnodes": "error",
    "react/jsx-no-literals": "off",
    "react/jsx-no-target-blank": "error",
    "react/jsx-pascal-case": "error",
    "react/jsx-sort-props": ["off", { "callbacksLast": true }],
    "react/jsx-space-before-closing": "error",
    "react/jsx-wrap-multilines": "error",
    "react/no-children-prop": "error",
    "react/no-comment-textnodes": "off",
    "react/no-danger": "error",
    "react/no-danger-with-children": "error",
    "react/no-did-mount-set-state": "error",
    "react/no-did-update-set-state": "error",
    "react/no-multi-comp": ["error", { "ignoreStateless": true }],
    "react/no-set-state": "off",
    "react/no-string-refs": "off",
    "react/no-unescaped-entities": "off",
    "react/no-unused-prop-types": "off", // does not always work as expected
    "react/prefer-es6-class": "off",
    "react/prefer-stateless-function": "error",
    "react/require-extension": "off",
    "react/require-optimization": "error",
    "react/self-closing-comp": "error",
    "react/sort-comp": "error",
    "react/sort-prop-types": ["off", { "callbacksLast": true }],
    "react/style-prop-object": "off", // TODO: need to replace `style` props with `theme` (Button, Link)
    "react/wrap-multilines": "off"
  }
}