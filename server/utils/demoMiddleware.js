import demoTemplate from 'app/template.demo.html'

export default function demoMiddleware(statics) {
  return (req, res, next) => {
    const result = demoTemplate({statics})

    res.send(result)
  }
}
