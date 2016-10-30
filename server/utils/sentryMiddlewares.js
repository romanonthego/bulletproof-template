import raven from 'raven'

export function sentryRequestMiddleware(req, res, next) {
  if (__SENTRY_DSN__) {
    raven.middleware.express.requestHandler(__SENTRY_DSN__)(req, res, next)
  } else {
    next()
  }
}

export function sentryErrorMiddleware(req, res, next) {
  if (__SENTRY_DSN__) {
    raven.middleware.express.errorHandler(__SENTRY_DSN__)(req, res, next)
  } else {
    next()
  }
}

