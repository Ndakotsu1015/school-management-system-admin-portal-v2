export function generatesCurrencySymbolCode(unicode: string) {

  const hexPattern = /^[0-9A-Fa-f]*[A-Fa-f]+[0-9A-Fa-f]*$/; // Regular expression to match hexadecimal digits

  let no = 0;
  if (unicode.match(hexPattern)) {
    console.log('Hexa');

    no = parseInt(unicode, 16);
  } else {
    no = parseInt(unicode);
  }
  const symbol = String.fromCodePoint(Number(no));
  return symbol;
}
