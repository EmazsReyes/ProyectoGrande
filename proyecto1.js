// 1. El programa debe de recibir tres parámetros.
const [
    // a. El tamaño que va a poseer la matriz.
    matrixSize,
  
    // b. La cantidad de células vivas.
    cellAliveAmount,
  
    // c. La cantidad de turnos que se van a ejecutar
    turnsAmount
  ] = process.argv
  .slice(2)
  .map((argument) => Number(argument));
  
  // 2. Validations
  // a. El primer parámetro debe de ser un número mayor a cero.
  if (matrixSize <= 0) throw `
  Matrix size should be higher than 0
  `
  
  // b. El segundo parámetro debe de ser un número mayor a cero
  if (cellAliveAmount <= 0) throw `
  The amount of cells alive should be higher than 0
  `
  
  // b. ... y menor que el límite creado por el primer parámetro
  if (cellAliveAmount > matrixSize ** 2) throw `
  The amount of cells alive 
  should be lower than the matrix\'s size
  `
  
  // c. El tercer parámetro debe de ser un número mayor a cero.
  if (turnsAmount <= 0) throw `
  The amount of turns should be higher than 0
  `
  
  // 4. Generación de la matriz:
  const deadCell = '-'
  const cellAlive = 'x'
  let matrix = [...new Array(matrixSize)].map(() => {
    return [...new Array(matrixSize)].map(() => deadCell)
  })
  
  // a. La matriz debe colocar la cantidad de células vivas
  let placedLivingCells = 0
  const getRandomPosition = () => Math.min(
    Math.floor(Math.random() * matrixSize),
    matrixSize
  )
  
  while (placedLivingCells < cellAliveAmount) {
    // según el segundo parámetro insertado, en lugares al azar.
    const [x, y] = [
        getRandomPosition(),
        getRandomPosition()
    ]
  
    if (matrix[x][y] !== cellAlive) {
        matrix[x][y] = cellAlive
        placedLivingCells++
    }
  }
  
  let auxiliarMatrix = JSON.parse(JSON.stringify(matrix))
  
  // a. Cada turno debe de imprimirse mostrando su número
  showTurnWithMatrix(0)
  
  // 5. Impresión de los turnos:
  for (let turn = 1; turn <= turnsAmount; turn++) {
    // Tenemos que ver la primera matriz
    matrix.forEach((row, x) => {
        row.forEach((_, y) => {
            let neighborsAmount = getNeighborsAmount(x, y)
  
            setAuxiliarMatrix(x, y, neighborsAmount)
        })
    })
  
    matrix = JSON.parse(JSON.stringify(auxiliarMatrix))
  
    // a. ... y debe de mostrar la matriz correspondiente para ese turno.
    showTurnWithMatrix(turn)
  }
  
  function setAuxiliarMatrix(x, y, neighborsAmount) {
    const isCellAlive = matrix[x][y] === cellAlive
  
    // agarrar cada célula y cambiarlo según
    if (!isCellAlive && neighborsAmount === 3) {
        // muere
        auxiliarMatrix[x][y] = cellAlive
    } else if (!(isCellAlive && neighborsAmount === 2 || neighborsAmount === 3)) {
        // vive: no hay que hacer nada
        // en otro caso, muere
        auxiliarMatrix[x][y] = deadCell
    }
  }
  
  function getNeighborsAmount(x, y) {
    let neighborsAmount = 0
  
    // recorrer los vecinos
    for (let xSlope = -1; xSlope <= 1; xSlope++) {
        for (let ySlope = -1; ySlope <= 1; ySlope++) {
  
            // pero no se recorre a sí mismo
            if (xSlope === 0 && ySlope === 0) {
                continue
            }
  
            const [slopedX, slopedY] = [x + xSlope, y + ySlope]
            const cell = matrix[slopedX]?.[slopedY]
            const isCellAlive = cell === cellAlive
  
            // contar cada vecino
            if (isCellAlive) neighborsAmount++
        }
    }
    
    return neighborsAmount
  }
  
  function showTurnWithMatrix(turn) {
    console.log(`Turno #${turn}`) 
    console.log(matrix.map(row => row.join('')).join('\n'))
  }