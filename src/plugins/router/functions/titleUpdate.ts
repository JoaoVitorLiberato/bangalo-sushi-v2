import { Route } from "vue-router"

const titleUpdate = (to: Route): void => {
  // https://alligator.io/vuejs/vue-router-modify-head/
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
  // const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  // Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title
  // if (!nearestWithMeta) return

  // nearestWithMeta.meta.metaTags.map(tagDef => {
  //   const tag = document.createElement('meta')

  //   Object.keys(tagDef).forEach(key => {
  //     tag.setAttribute(key, tagDef[key])
  //   })

  //   tag.setAttribute('data-vue-router-controlled', '')

  //   return tag
  // })
  // .forEach(tag => document.head.appendChild(tag))
}

export {
  titleUpdate,
}
