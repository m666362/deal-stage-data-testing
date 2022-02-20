import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import StageChangingTable from "./StageChangingTable";

const ZOHO = window.ZOHO;

function App() {
  const [zohoInitialized, setZohoInitialized] = useState(false);
  const [entity, setEntity] = useState("");
  const [entityId, setEntityId] = useState("");
  const [stageHistory, setStageHistory] = useState([]);
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
      console.log("Related List Data", stageHistoryResp?.data);
      setStageHistory(stageHistoryResp?.data);
    }
  }, [zohoInitialized, entity, entityId]);

  useEffect(()=>{
    if (stageHistory.length) {
      ZOHO.CRM.CONNECTION.invoke(conn_name, req_data).then(function (stageDetailsData) {
        console.log({stageDetailsData});
        setStageInfo(stageDetailsData?.details?.statusMessage?.stages)
      })
    }
  }, [stageHistory])

  return (
    <div className="App">
      {/* <header className="App-header">
        {stageHistory && <div>{JSON.stringify(stageHistory)}</div>}
        {stageHistory.length && <div>{JSON.stringify(stageInfo)}</div>}
      </header> */}
      <StageChangingTable stageHistory={stageHistory} stageInfo={stageInfo}/>
    </div>
  );
}

export default App;
