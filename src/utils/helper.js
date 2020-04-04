export function formata(n) {
  return (
    "R$ " +
    n
      .toFixed(2)
      .replace(".", ",")
      .replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
  );
}

export function formata2(n) {
  return parseFloat(n)
    .toFixed(2)
    .replace(".", ",")
    .replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}
