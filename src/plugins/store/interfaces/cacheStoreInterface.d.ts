interface cacheStoreInterface {
  rastreamentoUsuario: Record<string, string|string[]|number|number[]|boolean>
  frameLoading: {
    status: boolean,
    message: string,
  }
}

export {
  cacheStoreInterface,
}
