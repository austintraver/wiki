firebase.analytics()
firebase.performance()

document.addEventListener('DOMContentLoaded', function() {
  /* Trim any leading or trailing whitespace from
   the text content of any HTML sample elements */
  for (let node of document.querySelectorAll('samp')) {
    node.textContent = node.textContent.trim()
  }
})
