let toast = <HTMLDivElement>document.querySelector('div.toast')

/* Display a toast to the user */
const displayToast = async (content) => {
  /* If the window is already displaying a toast,
   don't try to display a new one */
  if (toast['timeout'] != null) {
    return
  }
  /* Display the toast for 3 seconds */
  toast.textContent = content
  toast.classList.add('show')
  toast['timeout'] = setTimeout(clearToast, 5000)
}
/* Clear the current toast being displayed */
const clearToast = async () => {
  toast.classList.remove('show')
  displayToast['textContent'] = ''
  toast['timeout'] = null
}

/**
 *
 * @param outer the outer HTML element containing the inner HTML element
 * @param inner the element that will be made transparent by default, only
 * becoming opaque if the user is hovering their cursor atop it
 */
const addOpacityListener = (outer, inner) => {
  /* When the user hovers over the link icon,
   make the icon appear fully opaque
   */
  inner.addEventListener('mouseenter', () => {
    inner.style['opacity'] = '100%'
  })
  /* When the user hovers over the header of a particular section,
   reduce the transparency of the link icon
   */
  outer.addEventListener('mouseover', () => {
    inner.style['opacity'] = '60%'
  })
  /* When the user is not hovering over the header
   of any particular section, make the link icon transparent.
   */
  outer.addEventListener('mouseout', () => {
    inner.style['opacity'] = '40%'
  })
}

/**
 * When the user clicks on the link, update the browser's URL to
 include this header's ID in the hash
 * @returns {Promise<void>}
 */
const createAnchorLinks = async () => {
  const headings = <NodeListOf<HTMLHeadingElement>>document.querySelectorAll('h1,h2,h3,h4,h5,h6')
  for (const heading of headings) {
    let fragment = document.createElement('img')
    fragment.classList.add('fragment')
    /*
     fragment.height = 24
     fragment.width = 24
     */
    fragment.src = '/img/link.svg'
    fragment.addEventListener('click', async () => {
      window.location.hash = `#${heading.id}`
      if (window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(`${heading.baseURI}`)
          await displayToast('Copied to clipboard')
        }
        catch (error) {
          alert(error)
        }
      }
      else {
        try {
          await displayToast('Error - insecure context')
        }
        catch (error) {
          alert(error)
        }
      }
    })
    heading.prepend(fragment)
    addOpacityListener(heading, fragment)
  }
}

/**
 * When the user clicks on the link, update the browser's URL to
 include this header's ID in the hash
 * @returns {Promise<void>}
 */
const createSnippetLinks = async () => {

  let snippets = document.querySelectorAll('pre.chroma')
  for (let snippet of snippets) {
    let img = document.createElement('img')
    img.classList.add('clone')
    img.src = '/img/clone.svg'
    img.title = 'Copy code to clipboard'
    img.addEventListener('click', async () => {
      if (window.isSecureContext) {
        try {
          console.log(snippet.textContent)
          await navigator.clipboard.writeText(snippet.textContent)
          await displayToast('Copied to clipboard')
        }
        catch (error) {
          alert(error)
        }
      }
    })
    snippet.insertBefore(img, snippet.firstChild)
    addOpacityListener(snippet, img)
  }
}

/**
 * Append a symbol to each link with a URL referencing a page external to
 * the current website
 */
const markExternalLinks = () => {
  const imageURL = '/img/external-link.svg'

  // Iterate through all of the anchor elements within an article
  for (let anchor of <NodeListOf<HTMLAnchorElement>>document.querySelectorAll('article a')) {

    // No need to mark anchors if they don't link to another resource
    if (!(anchor.hasAttribute('hostname'))) {
      continue
    }

    // Create a list of hostnames that represent a local development environment
    let locations = new Set([
      window.location.hostname, 'localhost', '[::1]', '127.0.0.1'
    ])

    // Don't mark internal links as if they were external
    if (locations.has(anchor.hostname) || anchor.hostname.endsWith('local') || anchor.hostname.endsWith('lan')) {
      continue
    }
    let link = document.createElement('img')
    link.src = imageURL
    link.classList.add('link')
    anchor.appendChild(link)
  }
}

document.addEventListener('DOMContentLoaded', createAnchorLinks)
document.addEventListener('DOMContentLoaded', createSnippetLinks)
document.addEventListener('DOMContentLoaded', markExternalLinks)