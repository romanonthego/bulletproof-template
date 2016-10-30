/* eslint-disable no-console */

import {captureException} from 'app/utils/sentry'
import {stringify} from 'app/utils/stringify'
import {toString} from 'app/utils/formErrors'

function showToUser(contextStr, err) {
  let message

  if (contextStr) {
    message = `${contextStr} произошла неожиданная ошибка.\nПодробнее: ${toString(err)}`
  } else {
    message = `Произошла неожиданная ошибка.\nПодробнее: ${toString(err)}`
  }

  console.warn('reportUnexpectedError/alert:', message)
}

function cutAuthorization(str) {
  // Sentry will show string containing "Authorization" as "*****"
  // And we as well don't want to send tokens
  return String(str)
    .replace(/authorization/gi, 'authori~~zation')
    .replace(/"JWT.*?"/gi, '"JWT ***"')
}

function sendToSentry(contextStr, err) {
  const exception = (err instanceof Error) ? err : new Error(stringify(err))
  captureException(exception, {
    tags: {
      source: 'reportUnexpectedError',
      context: contextStr,
    },
    extra: {
      fullMessage: cutAuthorization(exception.message),
    },
  })
}

export default function reportUnexpectedError(contextStr) {
  return err => {
    sendToSentry(contextStr, err)
    showToUser(contextStr, err)
  }
}


