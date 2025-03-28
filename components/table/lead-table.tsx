import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TProps = {
  dataTable: IDataContact[] | null;
};

const dataTableHeader = [
  "id",
  "created_time",
  "ad_id",
  "ad_name",
  "adset_id",
  "adset_name",
  "campaign_id",
  "campaign_name",
  "form_id",
  "form_name",
  "is_organic",
  "platform",
  "email",
  "e-mail",
  "TEL2",
  "Fournisseur_actuel",
  "CP",
  "Depuis",
  "Options",
  "Preference",
  "time2call",
  "Prix",
  "Recherche",
  "nom",
  "prenom",
  "Ville",
  "utm_device",
  "lead_device",
  "operateur_mobile",
  "is_internal",
];

export function LeadTable({ dataTable }: TProps) {
  const onCopy = (value: string) => {
    window.navigator.clipboard.writeText(value);
  };

  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader className="sticky top-0 left-0 right-0 bg-background">
        <TableRow>
          {dataTableHeader.map((dataHeader) => (
            <TableHead key={dataHeader}>{dataHeader}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(dataTable!).map(([_, data], i) => (
          <TableRow key={i}>
            <TableCell
              key={i}
              onClick={() => onCopy(data.id)}
              className="cursor-pointer"
            >
              {data.id}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.created_time)}
              className="cursor-pointer"
            >
              {data.created_time}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.ad_id)}
              className="cursor-pointer"
            >
              {data.ad_id}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.ad_name)}
              className="cursor-pointer"
            >
              {data.ad_name}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.adset_id)}
              className="cursor-pointer"
            >
              {data.adset_id}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.adset_name)}
              className="cursor-pointer"
            >
              {data.adset_name}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.campaign_id)}
              className="cursor-pointer"
            >
              {data.campaign_id}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.campaign_name)}
              className="cursor-pointer"
            >
              {data.campaign_name}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.form_id)}
              className="cursor-pointer"
            >
              {data.form_id}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.form_name)}
              className="cursor-pointer"
            >
              {data.form_name}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.is_organic)}
              className="cursor-pointer"
            >
              {data.is_organic}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.platform)}
              className="cursor-pointer"
            >
              {data.platform}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.email)}
              className="cursor-pointer"
            >
              {data.email}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data["e-mail"])}
              className="cursor-pointer"
            >
              {data["e-mail"]}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.TEL2)}
              className="cursor-pointer"
            >
              {data.TEL2}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.Fournisseur_actuel)}
              className="cursor-pointer"
            >
              {data.Fournisseur_actuel}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.CP)}
              className="cursor-pointer"
            >
              {data.CP}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.Depuis)}
              className="cursor-pointer"
            >
              {data.Depuis}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.Options)}
              className="cursor-pointer"
            >
              {data.Options}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.Preference)}
              className="cursor-pointer"
            >
              {data.Preference}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.time2call)}
              className="cursor-pointer"
            >
              {data.time2call}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.Prix)}
              className="cursor-pointer"
            >
              {data.Prix}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.Recherche)}
              className="cursor-pointer"
            >
              {data.Recherche}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.nom)}
              className="cursor-pointer"
            >
              {data.nom}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.prenom)}
              className="cursor-pointer"
            >
              {data.prenom}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.Ville)}
              className="cursor-pointer"
            >
              {data.Ville}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.utm_device)}
              className="cursor-pointer"
            >
              {data.utm_device}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.lead_device)}
              className="cursor-pointer"
            >
              {data.lead_device}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.operateur_mobile)}
              className="cursor-pointer"
            >
              {data.operateur_mobile}
            </TableCell>
            <TableCell
              key={i}
              onClick={() => onCopy(data.is_internal)}
              className="cursor-pointer"
            >
              {data.is_internal}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
