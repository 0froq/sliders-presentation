import type MarkdownItAsync from 'markdown-it'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItHashtag from 'markdown-it-hashtag'
import markdownItFigures from 'markdown-it-implicit-figures'
import markdownItMark from 'markdown-it-mark'
import markdownRuby from 'markdown-it-ruby'

import { defineConfig } from 'vite'

export default defineConfig({
  // plugins: {
  //   markdown: {
  //     markdownItSetup(md: any) {
  //       /* custom markdown-it plugins */
  //       md.use()
  //     },
  //   },
  // },
  slidev: {
    vue: {
      /* vue options */
    },
    markdown: {
      /* markdown-it options */
      markdownItSetup(md: MarkdownItAsync) {
        /* custom markdown-it plugins */
        md
          // .use(markdownItFootnote)
          .use(markdownItMark)
          .use(markdownItHashtag, {
            hashtagRegExp: '\\w+(\\/\\w+)*',
          })
          .use(markdownItFigures, {
            figcaption: true,
          })
          .use(markdownRuby)
        md.renderer.rules.hashtag_text = function (tokens, idx) {
          return `${tokens[idx].content}`
        }

        md.renderer.rules.hashtag_open = function (tokens, idx) {
          const tagName = tokens[idx].content.toLowerCase()
          return `<a href="/tags/${tagName}"><span class="tag">`
        }

        md.renderer.rules.hashtag_close = function () {
          return `</span></a>`
        }
      },
    },
    /* options for other plugins */
  },
})
