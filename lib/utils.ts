import cookie from 'cookie'
import {IncomingHttpHeaders} from 'http'
import jwt from 'jsonwebtoken'

import {AuthToken} from '../interfaces'

export const removeRegexFromString = (pattern: RegExp) => (string: string) =>
  string.replace(pattern, '')

export const removeURLScheme = removeRegexFromString(/^https?:\/\//g)

export const removeWebHostString = removeRegexFromString(/^www./g)

export const omitNull = (obj: {[key: string]: any}) => {
  const objCopy = {...obj}

  Object.keys(objCopy)
    .filter(k => objCopy[k] === null)
    .forEach(k => delete objCopy[k])

  return objCopy
}

export const validateHeaderToken = (headers: IncomingHttpHeaders) => {
  try {
    const {token} = cookie.parse(headers?.cookie || '')
    if (!token || !process.env.JWT_SECRET) return null

    const {id, email} = jwt.verify(token, process.env.JWT_SECRET) as AuthToken

    return {id, email}
  } catch (error) {
    return null
  }
}

export const scrollToEl = (selector: string) =>
  document.querySelector(selector)?.scrollIntoView({
    behavior: 'smooth',
  })
