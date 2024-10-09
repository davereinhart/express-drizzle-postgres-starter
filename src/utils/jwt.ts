import process from 'node:process'
import consola from 'consola'
import JWT from 'jsonwebtoken'
import _ from 'lodash'
import { BackendError } from './errors'

const {
  AUTH_JWT_ACCESS_TOKEN_EXPIRES_IN,
  AUTH_JWT_REFRESH_TOKEN_EXPIRES_IN,
  AUTH_JWT_ACCESS_TOKEN_SECRET,
  AUTH_JWT_REFRESH_TOKEN_SECRET,
} = process.env

const JWT_ACCESS_CONFIG: JWT.SignOptions = {
  expiresIn: AUTH_JWT_ACCESS_TOKEN_EXPIRES_IN,
}
const JWT_REFRESH_CONFIG: JWT.SignOptions = {
  expiresIn: AUTH_JWT_REFRESH_TOKEN_EXPIRES_IN,
}

export function generateTokens(userId: string) {
  return {
    authenticated: true,
    accessToken: JWT.sign({ userId }, AUTH_JWT_ACCESS_TOKEN_SECRET, JWT_ACCESS_CONFIG),
    refreshToken: JWT.sign({ userId }, AUTH_JWT_REFRESH_TOKEN_SECRET, JWT_REFRESH_CONFIG),
  }
}

export function verifyToken(token: string) {
  try {
    const data = JWT.verify(token, AUTH_JWT_ACCESS_TOKEN_SECRET)

    return data as { userId: string }
  }
  catch (err) {
    if (err instanceof JWT.TokenExpiredError) {
      throw new BackendError('UNAUTHORIZED', {
        message: 'Token expired',
      })
    }

    throw new BackendError('UNAUTHORIZED', {
      message: 'Invalid token',
    })
  }
}

export function refreshTokens(refreshToken: string) {
  try {
    const tokenPayload = JWT.verify(refreshToken, AUTH_JWT_REFRESH_TOKEN_SECRET, JWT_REFRESH_CONFIG)
    const newTokenPayload = _.pick(tokenPayload, ['userId'])

    const accessToken = JWT.sign(newTokenPayload, AUTH_JWT_ACCESS_TOKEN_SECRET, JWT_ACCESS_CONFIG)
    const newRefreshToken = JWT.sign(newTokenPayload, AUTH_JWT_ACCESS_TOKEN_SECRET, JWT_ACCESS_CONFIG)

    return {
      authenticated: true,
      accessToken,
      refreshToken: newRefreshToken,
    }
  }
  catch (err) {
    consola.log(err)
    return { authenticated: false }
  }
}
