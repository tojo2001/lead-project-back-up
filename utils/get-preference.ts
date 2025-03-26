export function getPreference(fournisseur: string, preference: string): string {
  if (!fournisseur) return preference;

  const defaultPreference = "Le meilleur débit";
  const formatedFournisseur = fournisseur?.toLocaleLowerCase();
  const formatedPreference = preference?.toLocaleLowerCase();

  const newPreference = formatedFournisseur.includes(formatedPreference)
    ? defaultPreference
    : preference;

  return newPreference;
}
