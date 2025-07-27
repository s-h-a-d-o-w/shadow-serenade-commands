// "save" is sometimes misunderstood as "if"
serenade.language('javascript').command('if', async (api) => {
  await api.runCommand('save')
})

serenade.language('javascript').text('insert key of', 'keyof ')
serenade.language('javascript').text('insert type of', 'typeof ')

serenade.language('javascript').snippet('key of <%name%>', 'keyof <%name%>')
serenade.language('javascript').snippet('type of <%name%>', 'typeof <%name%>')

// Standard constructs - A fourth parameter to snippet could be used to convey what the template string contains. But so far, that hasn't seemed necessary to me.
serenade
  .language('javascript')
  .snippet('const <%name%>', 'const <%name%> = <%cursor%>;')

serenade
  .language('javascript')
  .snippet('let <%name%>', 'let <%name%> = <%cursor%>;')

serenade
  .language('javascript')
  .snippet(
    'for <%name%>',
    'for (let <%name%> = ; <%name%> < ; <%name%>++) {\n<%indent%><%cursor%>\n}'
  )

serenade
  .language('javascript')
  .snippet(
    'while <%expression%>',
    'while (<%expression%>) {\n<%indent%><%cursor%>\n}'
  )

serenade
  .language('javascript')
  .snippet(
    'if <%expression%>',
    'if (<%expression%>) {\n<%indent%><%cursor%>\n}'
  )

serenade
  .language('javascript')
  .snippet('return <%expression%>', 'return <%expression%>;')

new Array('log', 'info', 'error', 'warning').forEach((logType) => {
  serenade
    .language('javascript')
    .snippet(`${logType} <%string%>`, `console.${logType}("<%string%>");`)
})

// Custom
serenade
  .language('javascript')
  .snippet(
    'pause <%value%>',
    'await new Promise((resolve) => setTimeout(resolve, <%value%>));'
  )
