
let toast = document.querySelector('div#toast')

/* Display a toast to the user */
const displayToast = async (content) => {
  /* If the window is already displaying a toast,
   don't try to display a new one */
  if (toast.timeout) {
    return
  }
  /* Display the toast for 3 seconds */
  toast.textContent = content
  toast.classList.add('show')
  toast.timeout = setTimeout(clearToast, 3000)
}
/* Clear the current toast being displayed */
const clearToast = async () => {
  toast.classList.remove('show')
  displayToast.textContent = ''
  toast.timeout = null
}
const createAnchorLinks = async () => {
  /* When the user clicks on the link, update the browser's URL to
   include this header's ID in the hash */
  const headings = document.querySelectorAll('h1,h2,h3,h4,h5,h6')
  headings.forEach((heading) => {
    let fragment = document.createElement('img')
    fragment.classList.add('fragment')
    fragment.src = '/img/link.svg'
    fragment.height = 24
    fragment.width = 24
    fragment.addEventListener('click', async () => {
      window.location.hash = `#${heading.id}`
      if (window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(`${heading.baseURI}#${heading.id}`)
          await displayToast('Copied to clipboard')
        } catch (error) {
          alert(error)
        }
      }
    })
    heading.appendChild(fragment)
    /* When the user hovers over the link icon,
     make the icon appear fully opaque
     */
    fragment.addEventListener('mouseenter', () => {
      fragment.style['opacity'] = '100%'
    })
    /* When the user hovers over the header of a particular section,
     reduce the transparency of the link icon
     */
    heading.addEventListener('mouseover', () => {
      fragment.style['opacity'] = '50%'
    })
    /* When the user is not hovering over the header
     of any particular section, make the link icon transparent.
     */
    heading.addEventListener('mouseout', () => {
      fragment.style['opacity'] = '20%'
    })
  })
}

const createSnippetLinks = async () => {

  /* When the user clicks on the link, update the browser's URL to
   include this header's ID in the hash */
  let snippets = document.querySelectorAll('pre.chroma')
  for (let snippet of snippets) {
    let img = document.createElement('img')
    img.classList.add('clone')
    img.src = '/img/clone.svg'
    img.title = "Copy code to clipboard"
    img.addEventListener('click', async () => {
      if (window.isSecureContext) {
        try {
          console.log(snippet.textContent)
          await navigator.clipboard.writeText(snippet.textContent)
          await displayToast('Copied to clipboard')
        } catch (error) {
          alert(error)
        }
      }
    })
    snippet.insertBefore(img, snippet.firstChild)
    /* When the user hovers over the link icon,
     make the icon appear fully opaque
     */
    img.addEventListener('mouseenter', () => {
      img.style['opacity'] = '100%'
    })
    /* When the user hovers over the header of a particular section,
     reduce the transparency of the link icon
     */
    snippet.addEventListener('mouseover', () => {
      img.style['opacity'] = '50%'
    })
    /* When the user is not hovering over the header
     of any particular section, make the link icon transparent.
     */
    snippet.addEventListener('mouseout', () => {
      img.style['opacity'] = '20%'
    })
  }
}

document.addEventListener('DOMContentLoaded', createAnchorLinks)
document.addEventListener('DOMContentLoaded', createSnippetLinks)
