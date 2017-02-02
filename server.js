const path = require('path')
const express = require('express')

const app = express()
// app.get('/test', (req, res)=>res.send('<a href="/month">Month</a>'))
app.use((req, res) => {
  const host = req.get('Host')
  if (host.includes('.apps')) {
    const [appName, server] = host.split('.apps')
    console.log({appName, server})
    const proto = req.headers['x-forwarded-proto'] || req.protocol
    const urlServer = 'apps'+server
    const urlPath = path.join(appName, req.url)
    const forwardUrl = `${proto}://${urlServer}/${urlPath}`
    res.status(307)
    res.location(forwardUrl)
    res.send(`Go to <a href="${forwardUrl}">${forwardUrl}</a>`)
  } else {
    res.send('On apps')
  }
})

app.listen(8080)