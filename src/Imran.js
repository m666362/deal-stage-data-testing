import "./App.css";
import { useEffect, useState } from "react";
import StageTable from "./StageTable";

const ZOHO = window.ZOHO;

function Imran() {
  const [zohoInitialized, setZohoInitialized] = useState(false);
  const [entity, setEntity] = useState("");
  const [entityId, setEntityId] = useState("");
  const [stageHistory, setStageHistory] = useState([]);
  useEffect(() => {
    ZOHO.embeddedApp.on("PageLoad", function (data) {
      setEntity(data.Entity);
      setEntityId(data.EntityId);
    });

    ZOHO.embeddedApp.init().then(() => {
      setZohoInitialized(true);
    });
  }, []);

  const fetchZohoData = async () => {
    if (zohoInitialized && entity !== "" && entityId !== "") {
      const feildsResp = await ZOHO.CRM.META.getFields({
        Entity: entity,
      });
      const fieldsMap = feildsResp?.fields;
      let stageMap = {};
      let stageHistoryObj = {};
      fieldsMap.forEach((fieldMap) => {
        if (fieldMap?.display_label === "Stage") {
          fieldMap?.pick_list_values?.forEach((picklistValue) => {
            stageMap[picklistValue.id] = picklistValue.display_value;
          });
        }
      });
      const stageHistoryResp = await ZOHO.CRM.API.getRelatedRecords({
        Entity: entity,
        RecordID: entityId,
        RelatedList: "Stage_History",
        page: 1,
        per_page: 200,
      });
      stageHistoryResp?.data.forEach((stage) => {
        let tempMap = stageHistoryObj?.[stageMap[stage.Stage]] || {
          startTime: stage.Last_Modified_Time,
        };
        tempMap.endTime = stage.Last_Modified_Time;
        stageHistoryObj[stageMap[stage.Stage]] = tempMap;
      });
      setStageHistory(stageHistoryObj);
    }
  };

  useEffect(() => {
    fetchZohoData();
  }, [zohoInitialized, entity, entityId]);
  console.log(stageHistory);
  if (Object.keys(stageHistory).length > 0) {
    return <StageTable stageHistory={stageHistory} />;
  } else {
    return <></>;
  }
}

export default Imran;

