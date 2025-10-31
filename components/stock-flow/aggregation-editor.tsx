"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { useLeadQueryStore } from "@/store/use-lead-query.store";

export default function AggregationEditor() {
  const { setCodeResult } = useLeadQueryStore();
  const [editorCode, setEditorCode] = useState("");
  const [applying, setApplying] = useState(false);

  const defaultPipeline = `[
  {
    $match: {
      fournisseur: { $not: /bouygues/i },
      preference: { $not: /(sfr|orange|sosh|free)/i },
      operateur: { $not: /(Bouygues|Lycamobile|Euro-Information|NRJ)/i },
      platform: { $not: /fb|ig|sms/i },
      nom: {$nq: ""},
      prenom: {$nq: ""},
    }
  }
]`;

  // handle Monaco code change
  const handleEditorChange = (value: string | undefined) => {
    setEditorCode(value || "");
  };

  // handle "Apply Pipeline" button click
  const handleApplyPipeline = () => {
    if (applying) return; // prevent multiple clicks

    setApplying(true);
    try {
      // ?? Safely parse the editor code into JS
      // We use "new Function" instead of JSON.parse because of regex literals
      const parsed = new Function(`return ${editorCode || defaultPipeline}`)();

      // Validate that the parsed content is an array and has a $match stage
      if (!Array.isArray(parsed) || !parsed[0]?.$match) {
        alert(
          "Invalid pipeline format. It must be an array with a $match object."
        );
        return;
      }

      // Use the helper class
      class PipelineBuilder {
        private stages: Record<string, any>[] = [];

        match(condition: Record<string, any>) {
          this.stages.push({ $match: condition });
          return this;
        }
      }

      const builder = new PipelineBuilder();
      builder.match(parsed[0].$match);
      const builtPipeline = (builder as any).stages; // or builder.build() if you implement build()

      setCodeResult(builtPipeline);
    } catch (err) {
      console.error("? Error parsing pipeline:", err);
      alert("Error parsing pipeline. Check your syntax.");
    } finally {
      setTimeout(() => setApplying(false), 1500); // simulate delay
    }
  };

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-2">
        Write only the <code className="italic">$match</code> stage filter
        criteria for your aggregation pipeline below.
      </p>

      <Editor
        className="h-auto min-h-[300px] border border-border rounded-md"
        defaultLanguage="javascript"
        defaultValue={defaultPipeline}
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
        }}
      />

      <div className="flex justify-end mt-4">
        <Button onClick={handleApplyPipeline} disabled={applying}>
          {applying ? "Applying..." : "Apply Pipeline"}
        </Button>
      </div>
    </div>
  );
}
