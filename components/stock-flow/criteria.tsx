import { ChangeEvent, FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import CriteriaBadgeList from "./criteria-badge-list";
import { TriangleAlert, X } from "lucide-react";
import {
  criteriaColumns,
  TCondition,
  useLeadQueryStore,
} from "@/store/use-lead-query.store";

export default function Criteria() {
  const {
    selectedColumns,
    setColumnCondition,
    resetSelectedColumns,
    setSelectedColumns,
    criteriaParameters,
    setCriteriaParameters,
    resetCriteriaParameters,
  } = useLeadQueryStore();

  const [value, setValue] = useState({ key: "", value: "" });

  // reset criteria parameter
  const onReset = () => {
    resetSelectedColumns();
    resetCriteriaParameters();
  };

  // on select parameters handler (for the select)
  const onSelectParameters = (
    e: ChangeEvent<HTMLSelectElement>,
    criteriaKey: string
  ) => {
    const { key, name } = JSON.parse(e.target.value);

    setCriteriaParameters(criteriaKey, { key, name }, true);
  };

  // on change value handler
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.trim()) return;

    setValue((prev) => ({
      ...prev,
      value: e.target.value,
    }));
  };

  // on add parameters handler (for the input)
  const onAddParameters = (
    e: FormEvent<HTMLFormElement>,
    criteriaKey: string
  ) => {
    e.preventDefault();

    setCriteriaParameters(
      criteriaKey,
      { key: value.value, name: value.value },
      true
    );

    setValue((prev) => ({ ...prev, value: "" }));
  };

  // on select condition
  const onConditionChange = (criteriaKey: string, condition: TCondition) => {
    setColumnCondition(criteriaKey, condition);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
        {criteriaColumns.map((criteria) => (
          <>
            {selectedColumns.includes(criteria.key) && (
              <div
                key={criteria.key}
                className="relative p-4 rounded-md border bg-card shadow-sm hover:border-primary transition-colors"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bg-accent hover:bg-destructive hover:border-none top-1 right-1 h-6 w-6 active:scale-95"
                  onClick={() => setSelectedColumns(criteria.key, false)}
                >
                  <X className="h-4 w-4" />
                </Button>

                <h2 className="text-lg font-semibold leading-none">
                  {criteria.name}
                </h2>
                <p className="text-[12px] text-muted-foreground mt-1">
                  Apply filtering criteria for the supplier.
                </p>

                <div className="flex items-center gap-2 my-3">
                  <select
                    className="border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    onChange={(e) =>
                      onConditionChange(
                        criteria.key,
                        e.target.value as TCondition
                      )
                    }
                  >
                    <option value="EQUAL">Equal</option>
                    <option value="NOT_EQUAL">Not equal</option>
                  </select>
                  <p className="text-sm text-muted-foreground">to</p>
                  {criteria.options ? (
                    <>
                      <select
                        className="border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary w-full"
                        defaultValue=""
                        onChange={(e) => onSelectParameters(e, criteria.key)}
                      >
                        <option value="" disabled hidden>
                          Select value
                        </option>
                        {criteria.options.map((option, i) => (
                          <option
                            key={option.key}
                            value={JSON.stringify(option)}
                          >
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <form onSubmit={(e) => onAddParameters(e, criteria.key)}>
                      <input
                        type="text"
                        placeholder="Enter value"
                        value={value.key === criteria.key ? value.value : ""}
                        onChange={onChangeHandler}
                        onFocus={() =>
                          setValue((prev) => ({ ...prev, key: criteria.key }))
                        }
                        onBlur={() =>
                          setValue((prev) => ({ ...prev, key: "" }))
                        }
                        className="border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary w-full"
                      />
                      <button type="submit" hidden />
                    </form>
                  )}
                </div>

                {criteriaParameters[criteria.key]?.options && (
                  <CriteriaBadgeList
                    criteriaKey={criteria.key}
                    options={criteriaParameters[criteria.key].options}
                  />
                )}
              </div>
            )}
          </>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        {selectedColumns.length ? (
          <>
            <Button
              variant="link"
              className="text-destructive underline"
              onClick={onReset}
            >
              Clear Criteria Filter
            </Button>
          </>
        ) : null}
      </div>

      {!selectedColumns.length && (
        <div className="flex flex-col items-center justify-center space-y-2 text-center text-muted-foreground">
          <div>
            <div className="flex items-center justify-center space-x-2 text-lg font-semibold text-foreground text-yellow-600">
              <TriangleAlert />
              <span>No Criteria Defined</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold text-foreground">
              Please add criteria to proceed
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Define your filtering rules based on your needs or M. Dinis&apos;s
              preferences. 😜
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
