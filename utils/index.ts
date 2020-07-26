export const removeRegexFromString = (pattern: RegExp) => (
  stringToSearch: string,
) => stringToSearch.replace(pattern, '')

export const removeURLScheme = removeRegexFromString(/^https?:\/\//g)

export const removeWebHostString = removeRegexFromString(/^www./g)
