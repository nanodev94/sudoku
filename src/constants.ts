/* eslint-disable no-unused-vars */

export enum PAGE {
  HOME = '/',
  GAME = '/game',
  HISTORY = '/history',
  SOLVE = '/solve',
}

export const TWITTER_DATA = {
  site: 'https://twitter.com/nanodev94',
  creator: '@nanodev94',
}

export const BOARD_ROWS = 9
export const BOARD_COLS = 9
export const EMPTY_FIELD = -1
export const EMPTY_BOARD = Array(BOARD_ROWS)
  .fill(null)
  .map(() => Array(BOARD_COLS).fill(EMPTY_FIELD))
export const FIELD_VALID_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]
