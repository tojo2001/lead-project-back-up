import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CAMPAGNES_LIST } from "@/constant/constant";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function StockFlow() {
  const collection = "Contacts";

  return (
    <main className="w-full max-h-screen overflow-hidden">
      <Tabs defaultValue="BYTEL" className="max-w-5xl mx-auto mt-14 pt-8">
        <TabsList>
          {CAMPAGNES_LIST.map((campagneList) => (
            <TabsTrigger
              key={campagneList.category}
              value={campagneList.category}
            >
              {campagneList.category}
            </TabsTrigger>
          ))}
        </TabsList>
        {CAMPAGNES_LIST.map((campagneList) => (
          <TabsContent
            key={campagneList.category}
            value={campagneList.category}
            className="h-[25rem] overflow-y-auto"
          >
            <div>
              {campagneList.campagnes.map((campagne) => (
                <div
                  key={campagne.id}
                  className="p-2 border-b border-slate-400 flex justify-between items-center"
                >
                  <h1>{campagne.campagne_name}</h1>
                  <Link
                    href={`/stock-flow/${campagne.db_id}?collection=${collection}&campagne_name=${campagne.campagne_name}&entity_id=${campagne.entity_id}&campaign_setting_id=${campagne.campaign_setting_id}`}
                    className="flex items-center gap-1 text-blue-600"
                  >
                    <p>Manage Stock</p>
                    <ExternalLink size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
