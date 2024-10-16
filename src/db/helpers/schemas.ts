import { z } from 'zod'

export const dateSchema = z.preprocess(
  (arg) => {
    if (typeof arg === 'string' || arg instanceof Date) {
      return new Date(arg)
    }
    return arg
  },
  z.date().nullable(),
)

export const nullableDateSchema = z.preprocess(
  (arg) => {
    if (typeof arg === 'string' || arg instanceof Date) {
      return new Date(arg)
    }
    return arg
  },
  z.date().nullable(),
)
