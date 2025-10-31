import { create } from "zustand";

type Store = {
  outputResult: TOutPutResult;
  setOutputResult: (result: TOutPutResult) => void;
  resetOutputResult: () => void;
};

export const useLeadOutputPanelStore = create<Store>((set, _get) => ({
  outputResult: {
    requestURI: null,
    results: [],
  },

  setOutputResult(result) {
    set({
      outputResult: result,
    });
  },

  resetOutputResult() {
    set({
      outputResult: {
        requestURI: null,
        results: [],
      },
    });
  },
}));
