export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Correo no puede estar vacío"
  if (!re.test(email)) return 'Ooops! Necesitamos un email valido'
  return ''
}
