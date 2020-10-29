document.addEventListener('DOMContentLoaded', (event) => {
  let article = document.querySelector('article')
  article.addEventListener('mouseover', (event) => {
    if (event.target.tagName.match(/H[1-6]/)) {
      /*
      TODO
      Create a new image element, an icon of a "link"
      Make the icon transparent

      When a user clicks on the icon...
        Set the clipboard to: `${heading.baseURI}#${heading.id}`

        A small div block, black text, white background
        floats up from the bottom: "Copied to clipboard"


      When a user hovers over an image...

        Modify the image's opacity, make it opaque
        Immediately display a tooltip: "Copy a link to this section"

      */

      // Create a new image element, whose image is the "link" icon
      let link = document.createElement('img')
      link.src = '/img/fa/r/link.svg'
      link.style['display'] = 'inline'

      link.addEventListener('click', )
      // event.target.style['border'] = '2px solid #888888';
    }
    else if (event.target.tagName === 'IMG') {

    }
    /*
    TODO
    For each code block...

      Create an image, an icon of two squares overlayed one on top of the other
      Add that image to the bottom right corner of the code block

      When a user hovers over the icon...
        Immediately display a tooltip: "Copy code to clipboard"

      When a user clicks on the icon...
        Copy the plain text of code snippet, preserving any newlines

     */
  })
  article.addEventListener('mouseout', (event) => {
    if (event.target.tagName.match(/H[1-6]/)) {
      event.target.style['border'] = 'none';
    }
  })
  let headings = document.querySelectorAll('article > h1,h2,h3,h4,h5,h6')
    for (let heading of headings) {
  }
})