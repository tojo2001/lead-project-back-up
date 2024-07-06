export function findDropdownTiggerName(
  data: {
    section: string;
    campagne: {
      name: string;
      key: TClients;
    }[];
  }[],
  state: TClients
) {
  for (const { section, campagne } of data) {
    for (const { name, key } of campagne) {
      if (key === state) {
        return `${section} - ${name}`;
      }
    }
  }
  return "Choose client";
}
