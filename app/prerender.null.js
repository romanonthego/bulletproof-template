// null prerender
// may be used to speed up development builds/rebuilds
// just renders template without any server-side prerender
// handles everything on the client

import template from 'app/template.html'
import {TOKEN_COOKIE_NAME} from 'app/flux/constants'

function renderPage(token, statics) {
  return template({
    html: '',
    initialState: token ? JSON.stringify({me: {token}}) : '{}',
    statics,
    ...GLOBALS,
  })
}

export default function prerenderNull(req, res, statics) {
  const {cookies: {[TOKEN_COOKIE_NAME]: token} = {}} = req

  res.send(renderPage(token, statics))
}
