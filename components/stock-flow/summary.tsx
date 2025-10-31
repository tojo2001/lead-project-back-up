import { TCondition, useLeadQueryStore } from "@/store/use-lead-query.store";
import JsonView from "@uiw/react-json-view";
import { githubDarkTheme } from "@uiw/react-json-view/githubDark";

export default function Summary() {
  const { codeResult, dateRange, selectedColumns, criteriaParameters } =
    useLeadQueryStore();

  const regexString = (arr: string[], cond: TCondition, column: string) => {
    const value = arr[0] === "" ? '""' : `"${arr[0]}"`;

    if (column === "nom" || column === "prenom") {
      return cond === "EQUAL" ? `{$eq: ${value}}` : `{$ne: ${value}}`;
    }

    return cond === "EQUAL"
      ? `/${arr.join("|")}/i`
      : `{$not: /${arr.join("|")}/i}`;
  };

  const criteriaParametersArr = {
    $match: Object.assign(
      {},
      ...selectedColumns
        .filter((column) => criteriaParameters[column].options.length > 0) // ? keep only valid ones
        .map((column) => ({
          [column]: regexString(
            criteriaParameters[column].options.map((option) => option.key),
            criteriaParameters[column].condition,
            column
          ),
        }))
    ),
  };

  function convertRegexToString(obj: any): any {
    if (obj instanceof RegExp) {
      return obj.toString(); // "/pattern/i"
    }
    if (Array.isArray(obj)) {
      return obj.map(convertRegexToString);
    }
    if (obj && typeof obj === "object") {
      return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [k, convertRegexToString(v)])
      );
    }
    return obj;
  }

  return (
    <div className="w-full space-y-4">
      <div>
        <h1>Summary</h1>
        <p className="text-sm text-muted-foreground">
          Review the selected filters and configuration details before applying
          changes.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm italic text-muted-foreground">- Date</p>
          {dateRange ? (
            <JsonView
              value={dateRange}
              style={githubDarkTheme}
              className="w-full h-auto max-h-[17rem] overflow-auto custom-scrollbar"
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              (No date range has been specified.)
            </p>
          )}
        </div>

        <div>
          <p className="text-sm italic text-muted-foreground">- Conditions</p>

          {!!codeResult && !Object.keys(criteriaParameters).length ? (
            <JsonView
              value={convertRegexToString(codeResult)!}
              style={githubDarkTheme}
              className="w-full h-auto max-h-[17rem] overflow-auto custom-scrollbar"
            />
          ) : (
            <JsonView
              value={criteriaParametersArr!}
              style={githubDarkTheme}
              className="w-full h-auto max-h-[17rem] overflow-auto custom-scrollbar"
            />
          )}
        </div>
      </div>
    </div>
  );
}
