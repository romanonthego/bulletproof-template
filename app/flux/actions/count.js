export const types = {
  INCREASE: 'INCREASE',
  DECREASE: 'DECREASE',
}

export function increase(n) {
  return {
    type: types.INCREASE,
    amount: n
  }
}

export function decrease(n) {
  return {
    type: types.DECREASE,
    amount: n
  }
}
