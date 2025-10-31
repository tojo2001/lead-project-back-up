import { TCriteriaParameters } from "@/store/use-lead-query.store";

type TConfig = {
  selectedColumns: string[];
  criteriaParameters: TCriteriaParameters;
  codeResult: any;
};

export function aggregationBuilder(
  isCodeMode: boolean,
  config: TConfig
): TAggregation {
  // if mode Code is enabled
  if (isCodeMode) {
    // check if codeResult is empty
    if (!config.codeResult.length) return { $match: {} };

    return { $match: config.codeResult?.[0].$match || {} };
  }

  // check if selectedColumns is empty
  if (!config.selectedColumns.length) return { $match: {} };

  // get valid criteriaParameters
  const validCriteriaParameters: TCriteriaParameters = Object.fromEntries(
    Object.entries(config.criteriaParameters).filter(
      ([_, value]) => value.options.length > 0
    )
  );

  const $match = Object.fromEntries(
    Object.entries(validCriteriaParameters).map(([key, value]) => {
      // ?? Take the first option (since $eq/$ne are for single values)
      const firstOption = value.options[0]?.key ?? "";
      const pattern = value.options.map((o) => o.key).join("|");
      const regex = new RegExp(pattern, "i");

      const isNameField = key === "nom" || key === "prenom";

      if (value.condition === "EQUAL") {
        if (isNameField) {
          // exact match
          return [key, { $eq: firstOption }];
        }
        // regex match
        return [key, regex];
      }

      if (value.condition === "NOT_EQUAL") {
        if (isNameField) {
          // exact inequality
          return [key, { $ne: firstOption }];
        }
        // regex negation
        return [key, { $not: regex }];
      }

      // skip unknown conditions
      return [key, {}];
    })
  );

  return {
    $match,
  };
}
