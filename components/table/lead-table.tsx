import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import EditForm from "./edit-form";
import { useLeadStore } from "@/store/use-lead.store";
import { dataToCSVFormat } from "@/utils/data-to-csv-format";
import { Pencil } from "lucide-react";

type EitLocation = {
  rowID: number;
  leadKey: string;
  leadValue: string;
};

const dataTableHeader = [
  {
    key: "id",
    value: "id",
    canEdit: true,
    options: [],
  },
  {
    key: "created_time",
    value: "created_time",
    canEdit: false,
    options: [],
  },
  {
    key: "ad_id",
    value: "ad_id",
    canEdit: true,
    options: [],
  },
  {
    key: "ad_name",
    value: "ad_name",
    canEdit: false,
    options: [],
  },
  {
    key: "adset_id",
    value: "adset_id",
    canEdit: false,
    options: [],
  },
  {
    key: "adset_name",
    value: "adset_name",
    canEdit: false,
    options: [],
  },
  {
    key: "campaign_id",
    value: "campaign_id",
    canEdit: false,
    options: [],
  },
  {
    key: "campaign_name",
    value: "campaign_name",
    canEdit: false,
    options: [],
  },
  {
    key: "form_id",
    value: "form_id",
    canEdit: false,
    options: [],
  },
  {
    key: "form_name",
    value: "form_name",
    canEdit: false,
    options: [],
  },
  {
    key: "is_organic",
    value: "is_organic",
    canEdit: false,
    options: [],
  },
  {
    key: "platform",
    value: "platform",
    canEdit: false,
    options: [],
  },
  {
    key: "email",
    value: "email",
    canEdit: true,
    options: [],
  },
  {
    key: "e-mail",
    value: "e-mail",
    canEdit: true,
    options: [],
  },
  {
    key: "TEL2",
    value: "TEL2",
    canEdit: false,
    options: [],
  },
  {
    key: "Fournisseur_actuel",
    value: "Fournisseur_actuel",
    canEdit: true,
    options: [
      "Bouygues",
      "Bouygues Télécom",
      "Orange",
      "Sosh",
      "Orange / Sosh",
      "FREE",
      "Aucun",
      "SFR",
      "SFR / RED",
    ],
  },
  {
    key: "CP",
    value: "CP",
    canEdit: true,
    options: [],
  },
  {
    key: "Depuis",
    value: "Depuis",
    canEdit: false,
    options: [],
  },
  {
    key: "Options",
    value: "Options",
    canEdit: false,
    options: [],
  },
  {
    key: "Preference",
    value: "Preference",
    canEdit: true,
    options: [
      "Bouygues",
      "Bouygues Télécom",
      "Orange",
      "Sosh",
      "Orange / Sosh",
      "FREE",
      "Aucun",
      "SFR",
      "SFR / RED",
      "La moins chère",
      "Le meilleur débit",
      "La plus fiable",
      "La plus rapide",
      "Sans Engagement",
    ],
  },
  {
    key: "time2call",
    value: "time2call",
    canEdit: false,
    options: [],
  },
  {
    key: "Prix",
    value: "Prix",
    canEdit: false,
    options: [],
  },
  {
    key: "Recherche",
    value: "Recherche",
    canEdit: false,
    options: [],
  },
  {
    key: "nom",
    value: "nom",
    canEdit: true,
    options: ["Inconnu"],
  },
  {
    key: "prenom",
    value: "prenom",
    canEdit: true,
    options: ["Inconnu"],
  },
  {
    key: "Ville",
    value: "Ville",
    canEdit: false,
    options: [],
  },
  {
    key: "utm_device",
    value: "utm_device",
    canEdit: false,
    options: [],
  },
  {
    key: "lead_device",
    value: "lead_device",
    canEdit: false,
    options: [],
  },
  {
    key: "operateur_mobile",
    value: "operateur_mobile",
    canEdit: false,
    options: [],
  },
  {
    key: "is_internal",
    value: "is_internal",
    canEdit: true,
    options: ["true", "false"],
  },
];

export function LeadTable() {
  const { setLead, leadData } = useLeadStore();

  // const [data, setData] = useState<IDataContact[] | null>(dataTable);
  const [editLocation, setEditLocation] = useState<EitLocation | null>(null);
  const [value, setValue] = useState("");
  const selectSubmitBtnFormRef = useRef<HTMLButtonElement | null>(null);

  const count = leadData.asArray?.length || 0;

  const onCopy = (value: string) => {
    window.navigator.clipboard.writeText(value);
  };

  const getOptions = (key: string) => {
    return dataTableHeader.find((d) => d.key == key)?.options;
  };

  const resetLocation = () => {
    setEditLocation(null);
    setValue("");
  };

  const onEditTrigger = (rowID: number, leadKey: string, leadValue: string) => {
    if (!dataTableHeader.find((d) => d.key == leadKey)?.canEdit) return;
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

  const changeSelectHandler = (selectedValue: string) => {
    setValue(selectedValue);
    setTimeout(() => selectSubmitBtnFormRef.current?.click());
  };

  const onEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value || !leadData.asArray) return;

    console.log({ value });

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
            <TableHead key={dataHeader.key}>
              <p className="flex items-center gap-2 text-nowrap">
                {dataHeader.value} {dataHeader.canEdit && <Pencil size={13} />}
              </p>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {Object.entries(leadData.asArray!).map(([_, data], rowID) => (
          <TableRow key={rowID}>
            {/* id */}
            <TableCell
              onDoubleClick={() => onEditTrigger(rowID, "id", data.id)}
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "id", data.id) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.id,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.id}</p>
              )}
            </TableCell>

            {/* created_time */}
            <TableCell
              onDoubleClick={() =>
                onEditTrigger(rowID, "created_time", data.created_time)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "created_time", data.created_time) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.created_time,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">
                  {data.created_time}
                </p>
              )}
            </TableCell>

            {/* ad_id */}
            <TableCell
              onDoubleClick={() => onEditTrigger(rowID, "ad_id", data.ad_id)}
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "ad_id", data.ad_id) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.ad_id,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.ad_id}</p>
              )}
            </TableCell>

            {/* ad_name */}
            <TableCell
              onDoubleClick={() =>
                onEditTrigger(rowID, "ad_name", data.ad_name)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "ad_name", data.ad_name) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.ad_name,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.ad_name}</p>
              )}
            </TableCell>

            {/* adset_id */}
            <TableCell
              onDoubleClick={() =>
                onEditTrigger(rowID, "adset_id", data.adset_id)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "adset_id", data.adset_id) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.adset_id,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.adset_id}</p>
              )}
            </TableCell>

            {/* adset_name */}
            <TableCell
              onDoubleClick={() =>
                onEditTrigger(rowID, "adset_name", data.adset_name)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "adset_name", data.adset_name) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.adset_name,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.adset_name}</p>
              )}
            </TableCell>

            {/* campaign_id */}
            <TableCell
              onDoubleClick={() =>
                onEditTrigger(rowID, "campaign_id", data.campaign_id)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "campaign_id", data.campaign_id) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.campaign_id,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.campaign_id}</p>
              )}
            </TableCell>

            {/* campaign_name */}
            <TableCell
              onDoubleClick={() =>
                onEditTrigger(rowID, "campaign_name", data.campaign_name)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "campaign_name", data.campaign_name) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.campaign_name,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">
                  {data.campaign_name}
                </p>
              )}
            </TableCell>

            {/* form_id */}
            <TableCell
              onDoubleClick={() =>
                onEditTrigger(rowID, "form_id", data.form_id)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "form_id", data.form_id) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.form_id,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.form_id}</p>
              )}
            </TableCell>

            {/* form_name */}
            <TableCell
              onDoubleClick={() =>
                onEditTrigger(rowID, "form_name", data.form_name)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "form_name", data.form_name) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.form_name,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.form_name}</p>
              )}
            </TableCell>

            {/* is_organic */}
            <TableCell
              onDoubleClick={() =>
                onEditTrigger(rowID, "is_organic", data.is_organic)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "is_organic", data.is_organic) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.is_organic,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.is_organic}</p>
              )}
            </TableCell>

            {/* platform */}
            <TableCell
              onDoubleClick={() =>
                onEditTrigger(rowID, "platform", data.platform)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "platform", data.platform) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.platform,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.platform}</p>
              )}
            </TableCell>

            {/* email */}
            <TableCell
              onDoubleClick={() => onEditTrigger(rowID, "email", data.email)}
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "email", data.email) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.email,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.email}</p>
              )}
            </TableCell>

            {/* e-mail */}
            <TableCell
              onDoubleClick={() =>
                onEditTrigger(rowID, "e-mail", data["e-mail"])
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "e-mail", data["e-mail"]) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data["e-mail"],
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data["e-mail"]}</p>
              )}
            </TableCell>

            {/* TEL2 */}
            <TableCell
              onDoubleClick={() => onEditTrigger(rowID, "TEL2", data.TEL2)}
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "TEL2", data.TEL2) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.TEL2,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.TEL2}</p>
              )}
            </TableCell>

            {/* Fournisseur_actuel */}
            <TableCell
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
                <EditForm
                  formtype="select"
                  formData={{
                    select: {
                      placeholder: data.Fournisseur_actuel,
                      onBlurFn: resetLocation,
                      value: value,
                      changeSelectHandler: changeSelectHandler,
                      options: getOptions("Fournisseur_actuel") ?? [],
                      onEditFn: onEdit,
                      selectSubmitBtnFormRef: selectSubmitBtnFormRef,
                    },
                  }}
                />
              ) : (
                <p className="cursor-text select-text">
                  {data.Fournisseur_actuel}
                </p>
              )}
            </TableCell>

            {/* CP */}
            <TableCell
              onDoubleClick={() => onEditTrigger(rowID, "CP", data.CP)}
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "CP", data.CP) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.CP,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.CP}</p>
              )}
            </TableCell>

            {/* Depuis */}
            <TableCell
              onDoubleClick={() => onEditTrigger(rowID, "Depuis", data.Depuis)}
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "Depuis", data.Depuis) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.Depuis,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.Depuis}</p>
              )}
            </TableCell>

            {/* Options */}
            <TableCell
              onDoubleClick={() =>
                onEditTrigger(rowID, "Options", data.Options)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "Options", data.Options) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.Options,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.Options}</p>
              )}
            </TableCell>

            {/* Preference */}
            <TableCell
              onDoubleClick={() =>
                onEditTrigger(rowID, "Preference", data.Preference)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "Preference", data.Preference) ? (
                <EditForm
                  formtype="select"
                  formData={{
                    select: {
                      placeholder: data.Preference,
                      onBlurFn: resetLocation,
                      value: value,
                      changeSelectHandler: changeSelectHandler,
                      options: getOptions("Preference") ?? [],
                      onEditFn: onEdit,
                      selectSubmitBtnFormRef: selectSubmitBtnFormRef,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.Preference}</p>
              )}
            </TableCell>

            {/* time2call */}
            <TableCell
              onDoubleClick={() =>
                onEditTrigger(rowID, "time2call", data.time2call)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "time2call", data.time2call) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.time2call,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.time2call}</p>
              )}
            </TableCell>

            {/* Prix */}
            <TableCell
              onDoubleClick={() => onEditTrigger(rowID, "Prix", data.Prix)}
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "Prix", data.Prix) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.Prix,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.Prix}</p>
              )}
            </TableCell>

            {/* Recherche */}
            <TableCell
              onDoubleClick={() =>
                onEditTrigger(rowID, "Recherche", data.Recherche)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "Recherche", data.Recherche) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.Recherche,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.Recherche}</p>
              )}
            </TableCell>

            {/* nom */}
            <TableCell
              onDoubleClick={() => onEditTrigger(rowID, "nom", data.nom)}
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "nom", data.nom) ? (
                <EditForm
                  formtype="select"
                  formData={{
                    select: {
                      placeholder: data.nom,
                      onBlurFn: resetLocation,
                      value: value,
                      changeSelectHandler: changeSelectHandler,
                      options: getOptions("nom") ?? [],
                      onEditFn: onEdit,
                      selectSubmitBtnFormRef: selectSubmitBtnFormRef,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.nom}</p>
              )}
            </TableCell>

            {/* prenom */}
            <TableCell
              onDoubleClick={() => onEditTrigger(rowID, "prenom", data.prenom)}
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "prenom", data.prenom) ? (
                <EditForm
                  formtype="select"
                  formData={{
                    select: {
                      placeholder: data.prenom,
                      onBlurFn: resetLocation,
                      value: value,
                      changeSelectHandler: changeSelectHandler,
                      options: getOptions("prenom") ?? [],
                      onEditFn: onEdit,
                      selectSubmitBtnFormRef: selectSubmitBtnFormRef,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.prenom}</p>
              )}
            </TableCell>

            {/* Ville */}
            <TableCell
              onDoubleClick={() => onEditTrigger(rowID, "Ville", data.Ville)}
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "Ville", data.Ville) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.Ville,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.Ville}</p>
              )}
            </TableCell>

            {/* utm_device */}
            <TableCell
              onDoubleClick={() =>
                onEditTrigger(rowID, "utm_device", data.utm_device)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "utm_device", data.utm_device) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.utm_device,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.utm_device}</p>
              )}
            </TableCell>

            {/* lead_device */}
            <TableCell
              onDoubleClick={() =>
                onEditTrigger(rowID, "lead_device", data.lead_device)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "lead_device", data.lead_device) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.lead_device,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.lead_device}</p>
              )}
            </TableCell>

            {/* operateur_mobile */}
            <TableCell
              onDoubleClick={() =>
                onEditTrigger(rowID, "operateur_mobile", data.operateur_mobile)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "operateur_mobile", data.operateur_mobile) ? (
                <EditForm
                  formtype="input"
                  formData={{
                    input: {
                      placeholder: data.operateur_mobile,
                      onBlurFn: resetLocation,
                      value: value,
                      onChangeFn: changeHandler,
                      onEditFn: onEdit,
                    },
                  }}
                />
              ) : (
                <p className="cursor-text select-text">
                  {data.operateur_mobile}
                </p>
              )}
            </TableCell>

            {/* is_internal */}
            <TableCell
              onDoubleClick={() =>
                onEditTrigger(rowID, "is_internal", data.is_internal)
              }
              className="hover:text-muted-foreground"
            >
              {isTriggered(rowID, "is_internal", data.is_internal) ? (
                <EditForm
                  formtype="select"
                  formData={{
                    select: {
                      placeholder: data.is_internal,
                      onBlurFn: resetLocation,
                      value: value,
                      changeSelectHandler: changeSelectHandler,
                      options: getOptions("is_internal") ?? [],
                      onEditFn: onEdit,
                      selectSubmitBtnFormRef: selectSubmitBtnFormRef,
                    },
                  }}
                />
              ) : (
                <p className="cursor-default select-text">{data.is_internal}</p>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
