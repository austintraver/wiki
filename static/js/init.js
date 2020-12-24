try {
  firebase.analytics()
  firebase.performance()
} catch (error) {
  console.error(error)
}