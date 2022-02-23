import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import StageChangingTable from "./StageChangingTable";

const ZOHO = window.ZOHO;

function App() {
  const [zohoInitialized, setZohoInitialized] = useState(false);
  const [entity, setEntity] = useState("");
  const [entityId, setEntityId] = useState("");
  const [stageHistory, setStageHistory] = useState(null);
  const [stageInfo, setStageInfo] = useState([]);
  var conn_name = "zoho_crm_conn";
  var req_data = {
    method: "GET",
    url: "https://www.zohoapis.com/crm/v2/settings/stages?module=Deals",
  };

  useEffect(() => {
    /*
     * Subscribe to the EmbeddedApp onPageLoad event before initializing
     */

    ZOHO.embeddedApp.on("PageLoad", function (data) {
      console.log({ data });
      setEntity(data.Entity);
      setEntityId(data.EntityId);
      //Custom Bussiness logic goes here
    });

    /*
     * initializing the widget.
     */
    ZOHO.embeddedApp.init().then(() => {
      setZohoInitialized(true);
    });
  }, []);

  useEffect(async () => {
    if (zohoInitialized && entity !== "" && entityId !== "") {
      const stageHistoryResp = await ZOHO.CRM.API.getRelatedRecords({
        Entity: entity,
        RecordID: entityId,
        RelatedList: "Stage_History",
        page: 1,
        per_page: 200,
      });
      // console.log("Related List Data", stageHistoryResp?.data);
      const tempHistory = stageHistoryResp?.data;
      const fieldData = await ZOHO.CRM.META.getFields({ Entity: entity });
      const pickListData = fieldData?.fields?.filter(
        (data) => data?.api_name === "Stage"
      )[0]?.pick_list_values;
      let result = {};
      pickListData.forEach((element) => {
        let tempData = { name: element.display_value };
        pickListData.forEach((nestedElement) => {
          tempData = { ...tempData, ...{ [`${nestedElement.id}`]: 0 } };
        });
        tempData = { [`${element.id}`]: tempData };
        result = { ...result, ...tempData };
      });
      let firstElementTime = {};
      let lastElementTime = {};

      for (let i = 0; i < tempHistory.length; i++) {
        const element = tempHistory[i];
        const lastElement = tempHistory[tempHistory.length - 1 - i];
        firstElementTime = {
          ...firstElementTime,
          ...{ [`${element.Stage}`]: element.Last_Modified_Time },
        };
        lastElementTime = {
          ...lastElementTime,
          ...{ [`${lastElement.Stage}`]: lastElement.Last_Modified_Time },
        };
      }
      console.log({ firstElementTime });
      console.log({ lastElementTime });

      Object.keys(firstElementTime).map((fromId) => {
        Object.keys(lastElementTime).map((toId) => {
          if (fromId !== toId) {
            var timeStart = new Date(firstElementTime?.[`${fromId}`]).getTime();
            var timeEnd = new Date(lastElementTime?.[`${toId}`]).getTime();
            var diff = (timeEnd - timeStart) / 1000;
            if (diff >= 0) {
              // let myData = result?.[`${fromId}`] || {};
              // let tempSubResult = {
              //   [`${toId}`]: diff,
              // };
              // myData = { ...myData, ...tempSubResult };
              // myData = {
              //   [`${fromId}`]: myData,
              // };
              result = {
                ...result,
                ...{
                  [fromId]: {
                    ...result?.[fromId],
                    ...{
                      [toId]: diff,
                    },
                  },
                },
              };
            }
          }
        });
      });

      // for (let i = tempHistory.length - 1; i > 0; i--) {
      //   const resp = tempHistory[i];
      //   const nextStage = tempHistory[i - 1];
      //   var timeStart = new Date(resp.Last_Modified_Time).getTime();
      //   var timeEnd = new Date(nextStage.Last_Modified_Time).getTime();
      //   var diff = (timeEnd - timeStart) / 1000;
      //   let myData = result?.[`${resp.Stage}`];
      //   let tempSubResult = {
      //     [`${nextStage.Stage}`]: diff,
      //   };
      //   myData = { ...myData, ...tempSubResult };
      //   myData = {
      //     [`${resp.Stage}`]: myData,
      //   };
      //   result = { ...result, ...myData };
      //   console.log({ tempSubResult });
      // }
      setStageHistory(result);
    }
  }, [zohoInitialized, entity, entityId]);

  return (
    <div className="App">
      {/* {Object.keys(stageHistory).length && <StageChangingTable stageHistory={stageHistory} />} */}
      {stageHistory != null ? (
        <StageChangingTable stageHistory={stageHistory} />
      ) : (
        <div>Please wait. Data is loading</div>
      )}
    </div>
  );
}

export default App;
