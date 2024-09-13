export function passwordValidator(password) {
  if (!password) return "Contraseña no puede ser vacío"
  if (password.length < 5) return 'Contraseña tiene que tener al menos 5 caracteres'
  return ''
}
