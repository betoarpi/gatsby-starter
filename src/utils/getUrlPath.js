import parsePath from "parse-path"

export const normalizePath = path => {
  if (path.endsWith(`/`)) {
    path = path.slice(0, -1)
  }

  if (!path.startsWith(`/`)) {
    path = `/${path}`
  }

  path = decodeURI(path)

  // Replace Backend URL
  path = path.replace(`${process.env.GATSBY_WP}/`, "/")

  // Remove trailing slash
  if (path.substr(-1) === "/" && path.length > 1) {
    path = path.substr(0, path.length - 1)
  }

  return path
}

/**
 * This is temporary until we can get a path field from MenuItems https://github.com/wp-graphql/wp-graphql/issues/1137
 *
 * https://stackoverflow.com/questions/736513/how-do-i-parse-a-url-into-hostname-and-path-in-javascript
 */
export const getUrlPath = url => {
  const parsedUrl = parsePath(url)

  return normalizePath(parsedUrl.pathname)
}
