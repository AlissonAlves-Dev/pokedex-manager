import { ABILITY_TRANSLATIONS_PT_BR } from "../data/abilityTranslations";

function formatAbilityNameInEnglish(name: string): string {
  return name
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getAbilityDisplayName(name: string): string {
  const normalizedName = name.trim().toLowerCase();

  return (
    ABILITY_TRANSLATIONS_PT_BR[normalizedName] ??
    formatAbilityNameInEnglish(normalizedName)
  );
}
