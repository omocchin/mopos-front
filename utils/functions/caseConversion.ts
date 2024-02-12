const snakeToCamel = (snakeCase: string ) => {
  return snakeCase.replace(/_([a-z])/g, (_, match) => match.toUpperCase())
}

export {
  snakeToCamel
}
