serenade
  .language('javascript')
  .snippet('add use effect', 'useEffect(() => {\n  <%cursor%>\n}, []);')

serenade
  .language('javascript')
  .snippet('add import react', 'import React from "react";', {}, 'import')

// See https://github.com/serenadeai/custom-commands/issues/13
// serenade
//   .language("javascript")
//   .snippet(
//     "add state <%getter%>",
//     "const [<%getter:camel%>, set<%getter:pascal%>] = useState(null);",
//   );
