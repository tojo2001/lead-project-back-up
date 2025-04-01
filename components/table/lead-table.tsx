import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChangeEvent, FormEvent, useState } from "react";
import EditForm from "./edit-form";
import { useLeadStore } from "@/store/use-lead.store";
import { dataToCSVFormat } from "@/utils/data-to-csv-format";

type EitLocation = {
  rowID: number;
  leadKey: string;
  leadValue: string;
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

export function LeadTable() {
  const { setLead, leadData } = useLeadStore();

  // const [data, setData] = useState<IDataContact[] | null>(dataTable);
  const [editLocation, setEditLocation] = useState<EitLocation | null>(null);
  const [value, setValue] = useState("");

  const count = leadData.asArray?.length || 0;

  const onCopy = (value: string) => {
    window.navigator.clipboard.writeText(value);
  };

  const resetLocation = () => {
    setEditLocation(null);
    setValue("");
  };

  const onEditTrigger = (rowID: number, leadKey: string, leadValue: string) => {
    setEditLocation({ rowID, leadKey, leadValue });
  };

  const isTriggered = (rowID: number, leadKey: string, leadValue: string) => {
    return (
      editLocation?.rowID == rowID &&
      editLocation.leadKey == leadKey &&
      editLocation.leadValue == leadValue
    );
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value || !leadData.asArray) return;

    const modifiedDataTable = leadData.asArray.map((data, id) => {
      if (id === editLocation?.rowID && value != "") {
        return {
          ...data,
          [editLocation.leadKey]: value,
        };
      } else {
        return {
          ...data,
        };
      }
    });

    // get phone number
    const phoneNumbers = modifiedDataTable.map((leads) => leads.TEL2);

    // get leads as csv text
    const leadAsCSVText = dataToCSVFormat(modifiedDataTable) ?? "";

    setLead(modifiedDataTable, leadAsCSVText, phoneNumbers);
    setValue("");
  };

  return (
    <Table>
      <TableCaption className="fixed top-[-3rem] right-[1rem]">
        {count} Lead(s) in total
      </TableCaption>
      <TableHeader className="sticky top-0 left-0 right-0 bg-background">
        <TableRow>
          {dataTableHeader.map((dataHeader) => (
            <TableHead key={dataHeader}>{dataHeader}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(leadData.asArray!).map(([_, data], rowID) => (
          <TableRow key={rowID}>
            {/* id */}
            <TableCell
              onClick={() => onCopy(data.id)}
              onDoubleClick={() => onEditTrigger(rowID, "id", data.id)}
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "id", data.id) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.id}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.id}</>
              )}
            </TableCell>

            {/* created_time */}
            <TableCell
              onClick={() => onCopy(data.created_time)}
              onDoubleClick={() =>
                onEditTrigger(rowID, "created_time", data.created_time)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "created_time", data.created_time) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.created_time}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.created_time}</>
              )}
            </TableCell>

            {/* ad_id */}
            <TableCell
              onClick={() => onCopy(data.ad_id)}
              onDoubleClick={() => onEditTrigger(rowID, "ad_id", data.ad_id)}
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "ad_id", data.ad_id) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.ad_id}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.ad_id}</>
              )}
            </TableCell>

            {/* ad_name */}
            <TableCell
              onClick={() => onCopy(data.ad_name)}
              onDoubleClick={() =>
                onEditTrigger(rowID, "ad_name", data.ad_name)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "ad_name", data.ad_name) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.ad_name}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.ad_name}</>
              )}
            </TableCell>

            {/* adset_id */}
            <TableCell
              onClick={() => onCopy(data.adset_id)}
              onDoubleClick={() =>
                onEditTrigger(rowID, "adset_id", data.adset_id)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "adset_id", data.adset_id) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.adset_id}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.adset_id}</>
              )}
            </TableCell>

            {/* adset_name */}
            <TableCell
              onClick={() => onCopy(data.adset_name)}
              onDoubleClick={() =>
                onEditTrigger(rowID, "adset_name", data.adset_name)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "adset_name", data.adset_name) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.adset_name}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.adset_name}</>
              )}
            </TableCell>

            {/* campaign_id */}
            <TableCell
              onClick={() => onCopy(data.campaign_id)}
              onDoubleClick={() =>
                onEditTrigger(rowID, "campaign_id", data.campaign_id)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "campaign_id", data.campaign_id) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.campaign_id}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.campaign_id}</>
              )}
            </TableCell>

            {/* campaign_name */}
            <TableCell
              onClick={() => onCopy(data.campaign_name)}
              onDoubleClick={() =>
                onEditTrigger(rowID, "campaign_name", data.campaign_name)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "campaign_name", data.campaign_name) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.campaign_name}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.campaign_name}</>
              )}
            </TableCell>

            {/* form_id */}
            <TableCell
              onClick={() => onCopy(data.form_id)}
              onDoubleClick={() =>
                onEditTrigger(rowID, "form_id", data.form_id)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "form_id", data.form_id) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.form_id}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.form_id}</>
              )}
            </TableCell>

            {/* form_name */}
            <TableCell
              onClick={() => onCopy(data.form_name)}
              onDoubleClick={() =>
                onEditTrigger(rowID, "form_name", data.form_name)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "form_name", data.form_name) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.form_name}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.form_name}</>
              )}
            </TableCell>

            {/* is_organic */}
            <TableCell
              onClick={() => onCopy(data.is_organic)}
              onDoubleClick={() =>
                onEditTrigger(rowID, "is_organic", data.is_organic)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "is_organic", data.is_organic) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.is_organic}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.is_organic}</>
              )}
            </TableCell>

            {/* platform */}
            <TableCell
              onClick={() => onCopy(data.platform)}
              onDoubleClick={() =>
                onEditTrigger(rowID, "platform", data.platform)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "platform", data.platform) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.platform}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.platform}</>
              )}
            </TableCell>

            {/* email */}
            <TableCell
              onClick={() => onCopy(data.email)}
              onDoubleClick={() => onEditTrigger(rowID, "email", data.email)}
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "email", data.email) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.email}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.email}</>
              )}
            </TableCell>

            {/* e-mail */}
            <TableCell
              onClick={() => onCopy(data["e-mail"])}
              onDoubleClick={() =>
                onEditTrigger(rowID, "e-mail", data["e-mail"])
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "e-mail", data["e-mail"]) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data["e-mail"]}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data["e-mail"]}</>
              )}
            </TableCell>

            {/* TEL2 */}
            <TableCell
              onClick={() => onCopy(data.TEL2)}
              onDoubleClick={() => onEditTrigger(rowID, "TEL2", data.TEL2)}
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "TEL2", data.TEL2) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.TEL2}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.TEL2}</>
              )}
            </TableCell>

            {/* Fournisseur_actuel */}
            <TableCell
              onClick={() => onCopy(data.Fournisseur_actuel)}
              onDoubleClick={() =>
                onEditTrigger(
                  rowID,
                  "Fournisseur_actuel",
                  data.Fournisseur_actuel
                )
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(
                rowID,
                "Fournisseur_actuel",
                data.Fournisseur_actuel
              ) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.Fournisseur_actuel}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.Fournisseur_actuel}</>
              )}
            </TableCell>

            {/* CP */}
            <TableCell
              onClick={() => onCopy(data.CP)}
              onDoubleClick={() => onEditTrigger(rowID, "CP", data.CP)}
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "CP", data.CP) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.CP}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.CP}</>
              )}
            </TableCell>

            {/* Depuis */}
            <TableCell
              onClick={() => onCopy(data.Depuis)}
              onDoubleClick={() => onEditTrigger(rowID, "Depuis", data.Depuis)}
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "Depuis", data.Depuis) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.Depuis}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.Depuis}</>
              )}
            </TableCell>

            {/* Options */}
            <TableCell
              onClick={() => onCopy(data.Options)}
              onDoubleClick={() =>
                onEditTrigger(rowID, "Options", data.Options)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "Options", data.Options) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.Options}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.Options}</>
              )}
            </TableCell>

            {/* Preference */}
            <TableCell
              onClick={() => onCopy(data.Preference)}
              onDoubleClick={() =>
                onEditTrigger(rowID, "Preference", data.Preference)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "Preference", data.Preference) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.Preference}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.Preference}</>
              )}
            </TableCell>

            {/* time2call */}
            <TableCell
              onClick={() => onCopy(data.time2call)}
              onDoubleClick={() =>
                onEditTrigger(rowID, "time2call", data.time2call)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "time2call", data.time2call) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.time2call}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.time2call}</>
              )}
            </TableCell>

            {/* Prix */}
            <TableCell
              onClick={() => onCopy(data.Prix)}
              onDoubleClick={() => onEditTrigger(rowID, "Prix", data.Prix)}
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "Prix", data.Prix) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.Prix}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.Prix}</>
              )}
            </TableCell>

            {/* Recherche */}
            <TableCell
              onClick={() => onCopy(data.Recherche)}
              onDoubleClick={() =>
                onEditTrigger(rowID, "Recherche", data.Recherche)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "Recherche", data.Recherche) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.Recherche}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.Recherche}</>
              )}
            </TableCell>

            {/* nom */}
            <TableCell
              onClick={() => onCopy(data.nom)}
              onDoubleClick={() => onEditTrigger(rowID, "nom", data.nom)}
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "nom", data.nom) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.nom}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.nom}</>
              )}
            </TableCell>

            {/* prenom */}
            <TableCell
              onClick={() => onCopy(data.prenom)}
              onDoubleClick={() => onEditTrigger(rowID, "prenom", data.prenom)}
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "prenom", data.prenom) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.prenom}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.prenom}</>
              )}
            </TableCell>

            {/* Ville */}
            <TableCell
              onClick={() => onCopy(data.Ville)}
              onDoubleClick={() => onEditTrigger(rowID, "Ville", data.Ville)}
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "Ville", data.Ville) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.Ville}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.Ville}</>
              )}
            </TableCell>

            {/* utm_device */}
            <TableCell
              onClick={() => onCopy(data.utm_device)}
              onDoubleClick={() =>
                onEditTrigger(rowID, "utm_device", data.utm_device)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "utm_device", data.utm_device) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.utm_device}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.utm_device}</>
              )}
            </TableCell>

            {/* lead_device */}
            <TableCell
              onClick={() => onCopy(data.lead_device)}
              onDoubleClick={() =>
                onEditTrigger(rowID, "lead_device", data.lead_device)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "lead_device", data.lead_device) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.lead_device}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.lead_device}</>
              )}
            </TableCell>

            {/* operateur_mobile */}
            <TableCell
              onClick={() => onCopy(data.operateur_mobile)}
              onDoubleClick={() =>
                onEditTrigger(rowID, "operateur_mobile", data.operateur_mobile)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "operateur_mobile", data.operateur_mobile) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.operateur_mobile}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.operateur_mobile}</>
              )}
            </TableCell>

            {/* is_internal */}
            <TableCell
              onClick={() => onCopy(data.is_internal)}
              onDoubleClick={() =>
                onEditTrigger(rowID, "is_internal", data.is_internal)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "is_internal", data.is_internal) ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditForm
                          placeholder={data.is_internal}
                          onBlurFn={resetLocation}
                          value={value}
                          onChangeFn={changeHandler}
                          onEditFn={onEdit}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <small>CTRL + V to paste the current value.</small>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>{data.is_internal}</>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
