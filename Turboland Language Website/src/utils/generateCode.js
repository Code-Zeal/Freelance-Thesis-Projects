function generateCode() {
  var longitud = 5; // Longitud del código
  var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Caracteres posibles
  var code = '';
  for (var i = 0; i < longitud; i++) {
    code += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return code;
}

function generateUniqueCode() {
  var fecha = new Date();
  var timestamp = fecha.getTime();
  var newCode = generateCode() + timestamp;
  return newCode;
}

export default generateUniqueCode
