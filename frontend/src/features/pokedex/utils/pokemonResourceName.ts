function capitalizeWord(word: string): string {
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
}

export function formatPokemonResourceName(value: string): string {
  return value
    .trim()
    .replace(/[_\s]+/g, "-")
    .split("-")
    .filter(Boolean)
    .map(capitalizeWord)
    .join(" ");
}
