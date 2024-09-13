export function generalValidator(name,type) {
  if (!name) return `El campo ${type} no puede estar vacío`
  return ''
}
