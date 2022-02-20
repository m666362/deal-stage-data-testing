const stageinfo = [
  {
    display_label: "Qualification",
    id: "4728790000000006801",
    name: "Qualification",
  },
  {
    display_label: "Proposal/Price Quote",
    id: "4728790000000006811",
    name: "Proposal/Price_Quote",
  },
  {
    display_label: "Closed_Won",
    id: "4728790000000006815",
    name: "Closed_Won",
  },
  {
    display_label: "Researching",
    id: "4728790000000345353",
    name: "Researching",
  },
  {
    display_label: "Partner_RFP_Received",
    id: "4728790000000345358",
    name: "Partner_RFP_Received",
  },
];

var result = {
  Jamal: {
    farhan: "True",
  },
};

// if (result?.Jamal) {
//   let temp = {
//     rayhan: "True",
//   };
//   result.Jamal = { ...result.Jamal, ...temp };
// } else {
//   result = { ...result, Jamal: { rayhan: "True" } };
// }
// console.log(result);

var result = {};
stageinfo.map((stage, stageIndex) => {
  let nestedTemp = {};
  stageinfo.map((innerStage, innerStageIndex) => {
    let temp = {
      [`${innerStage.id}`]: 0,
    };
    nestedTemp = { ...nestedTemp, ...temp };
  });
  let temp = {
    [`${stage.id}`]: nestedTemp,
  };
  result = { ...result, ...temp };
});

const response = [
  {
    Last_Modified_Time: "2022-02-20T11:20:08+06:00",
    Stage: "4728790000000345353",
  },
  {
    Last_Modified_Time: "2022-02-20T11:20:01+06:00",
    Stage: "4728790000000345358",
  },
  {
    Last_Modified_Time: "2022-02-20T11:19:57+06:00",
    Stage: "4728790000000006801",
  },
  {
    Last_Modified_Time: "2022-02-20T11:19:53+06:00",
    Stage: "4728790000000345353",
  },
  {
    Last_Modified_Time: "2022-02-20T11:10:17+06:00",
    Stage: "4728790000000006815",
  },
  {
    Last_Modified_Time: "2022-02-20T11:09:39+06:00",
    Stage: "4728790000000006801",
  },
];
//   console.log({response});
response.map((resp, respIndex) => {
  if (respIndex < response.length - 1) {
    var timeEnd = new Date(resp.Last_Modified_Time).getTime();
    var timeStart = new Date(
      response[respIndex + 1].Last_Modified_Time
    ).getTime();
    var diff = timeEnd - timeStart;
    // result?.[`${resp.Stage}`]?.[`${response[respIndex+1].Stage}`] = diff
    // console.log({ diff: diff / 1000 });
    // result?.[`${response[respIndex+1].Stage}`]?.[`${resp.Stage}`] = diff ;
    
    // console.log({prev: response[respIndex+1].Stage});
    // console.log({new: resp.Stage});
    // let temp ={
    //     [`${result?.[`${response[respIndex+1].Stage}`]?.[`${resp.Stage}`]}`] : diff
    // }
    // result = {
    //     ...result, ...temp
    // }
    let myData  = { [`${response[respIndex+1].Stage}`]: result?.[`${response[respIndex+1].Stage}`]};
    let da = {
        [`${resp.Stage}`]: diff
    }
    myData = {...myData, ...da}
    console.log({myData});
    // let da = {
    //     [`${resp.Stage}`]: diff
    // }
    // myData = {...myData, ...da}
    // console.log({myData});
    // let temp ={
    //     [`${response[respIndex+1].Stage}`]: {
    //         [`${resp.Stage}`]: diff
    //     }
    // }
    // console.log(temp);
    // result = {...result, ...myData}
    // result?.[`${response[respIndex+1].Stage}`] = {...result?.[`${response[respIndex+1].Stage}`], ...temp}
    // console.log("REs", result?.[`${response[respIndex+1].Stage}`]?.[`${resp.Stage}`], diff);
  }
});


// console.log({result});

