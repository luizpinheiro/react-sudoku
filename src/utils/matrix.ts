/**
 * Creates a new SIZExSIZE matrix where the elements have the type T
 * and initializes its values with the value provided to the
 * parameter initialValue.
 *
 * @param size
 * @param initialValue
 */
export const createMatrix = <T>(size: number, initialValue: T): T[][] => {
  const matrix: T[][] = []
  for (let y = 0; y < size; y += 1) {
    if (!matrix[y]) matrix[y] = []
    for (let x = 0; x < size; x += 1) {
      matrix[y][x] = initialValue
    }
  }
  return matrix
}

/**
 * Clones a given matrix. Necessary when updating react states.
 * @param matrix
 */
export const cloneMatrix = <T>(matrix: T[][]): T[][] => {
  const resultMatrix: T[][] = []
  for (let y = 0; y < 9; y += 1) {
    if (!resultMatrix[y]) resultMatrix[y] = []
    for (let x = 0; x < 9; x += 1) {
      resultMatrix[y][x] = matrix[y][x]
    }
  }
  return resultMatrix
}
