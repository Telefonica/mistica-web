# Figma verifier

Audit a just-completed Figma implementation. Compare the running app against the Figma design visually and
structurally, then report drift. Re-read [../figma-mcp.md](../figma-mcp.md) for the prime directive and skill
rules before starting.

## Tasks

1. **Fetch the Figma screenshot** via `mcp__plugin_figma_figma__get_screenshot` for the entry node.
   `get_metadata` gives the frame's viewport dimensions.

2. **Render the implementation**:

   - Start the dev server in the background, piping output to a log file.
   - Wait for it to start.
   - Screenshot via Playwright CLI:

     ```bash
     npx -y playwright@1.60.0 screenshot \
       --viewport-size=<width>,<height> \
       --full-page \
       <url> \
       /tmp/verifier-actual.png
     ```

     Use the Figma frame's dimensions. For responsive designs, repeat per breakpoint.

3. **Compare visually**: open `/tmp/verifier-actual.png` and compare against the Figma screenshot. Catalog
   drift in: layout, spacing, typography (weight/size/line- height — compare letter forms), colors, assets
   (missing / wrong), and component primitive choice.

4. **Structural / rule check**:

   - Re-drill every composite component with `get_design_context({ disableCodeConnect: true })` and compare
     props against the drilled-in DOM.
   - Read each implementation file. Flag: hex literals or raw `var(--...)`, manual `font-size` /
     `font-family`, composite props that don't match the non-CodeConnect DOM, spacing values absent from the
     DOM, mismatched semantic structure (`Stack` vs `Inline`, flat vs nested), native HTML where a Mistica
     primitive exists, wrong/missing skin/font/body-background for the file's brand.

5. **Report**. One summary line (`clean` or `N issues found, M blocking`), then a bullet list ordered by
   severity. Each issue:

   - `[VISUAL]` or `[RULE]` prefix
   - Figma node id (or screenshot region) + what the design specifies
   - File:line (for `[RULE]`) or screenshot region (for `[VISUAL]`)
   - What's wrong + proposed fix

   Only flag drift and rule violations — no architectural rewrites or "improvements".
