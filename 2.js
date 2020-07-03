const cachedFetch = (url, options) => {
  // Use the URL as the cache key to localStorage
  let cacheKey = url
  let cached = localStorage.getItem(cacheKey)
  if (cached !== null) { 
    let response = new Response(new Blob([cached]))
    return Promise.resolve(response)
  }

  return fetch(url, options).then(response => {   
    if (response.status === 200) {
      let ct = response.headers.get('Content-Type')
      if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {       
        response.clone().text().then(content => {
          localStorage.setItem(cacheKey, content)
        })
      }
    }
    return response
  })
}

cachedFetch('https://httpbin.org/get')
  .then(r => r.json())
  .then(info => {
    console.log(info.origin)
  })
