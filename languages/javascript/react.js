serenade
  .language('javascript')
  .snippet('add import react', 'import React from "react";', {}, 'import')

new Array('callback', 'effect', 'memo', 'layout effect').forEach((hook) => {
  serenade
    .language('javascript')
    .snippet(
      `use ${hook}`,
      `use${
        hook === 'layout effect'
          ? 'LayoutEffect'
          : hook.charAt(0).toUpperCase() + hook.slice(1)
      }(() => {\n<%indent%><%cursor%>\n}, []);`
    )
})

serenade
  .language('javascript')
  .snippet(
    'use action state <%name%>',
    'const [state, formAction, isPending] = useActionState(<%name%>, <%cursor%>);'
  )

serenade
  .language('javascript')
  .snippet('use context <%name%>', 'const {<%cursor%>} = useContext(<%name%>);')

serenade
  .language('javascript')
  .snippet(
    'use deferred <%name%>',
    'const <%name%> = useDeferredValue(<%cursor%>);'
  )

serenade
  .language('javascript')
  .snippet('use ref <%name%>', 'const <%name%> = useRef(null);')

// Requires manual fixing (setter casing) after use
serenade
  .language('javascript')
  .snippet(
    'use state <%name%>',
    'const [<%name%>, set<%name%>] = useState(<%cursor%>);'
  )

serenade
  .language('javascript')
  .snippet(
    'use transition',
    'const [isPending, startTransition] = useTransition();'
  )
