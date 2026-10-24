<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
Assessment cord geometry and tag transforms share a breakpoint-aware scale so the pin, cord, and tag remain connected when the viewport changes.
Public service detail pages use individual TanStack routes with their own metadata and sitemap decisions; shared navigation resolves homepage anchors from those pages so links remain functional.
The sitemap is served from public/sitemap.xml, not a competing server route; update its entries when public pages change and omit private/auth pages and non-page-specific lastmod values.
