import cookie from 'cookie'
import jwt from 'jsonwebtoken'

import {AuthToken} from '../interfaces'

export const removeRegexFromString = (pattern: RegExp) => (
  stringToSearch: string,
) => stringToSearch.replace(pattern, '')

export const removeURLScheme = removeRegexFromString(/^https?:\/\//g)

export const removeWebHostString = removeRegexFromString(/^www./g)

export const validateHeaderToken = (headers: any) => {
  try {
    const {token} = cookie.parse(headers?.cookie || '')
    if (!token || !process.env.JWT_SECRET) return null

    const {id, email} = jwt.verify(token, process.env.JWT_SECRET) as AuthToken

    return {id, email}
  } catch (error) {
    return null
  }
}
