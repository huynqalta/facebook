import React, { forwardRef, useImperativeHandle } from "react";
import XLSX from "xlsx";
import { saveAs } from "file-saver";

interface colConvert {
  cols: Array<any>;
  type: any; // s:string , n:number,
}

interface IProps {
  id: any;
  className: any;
  table: any;
  filename: any;
  sheet: any;
  refTable: any;
  key: any;
  buttonText: any;
  raw: boolean;
  colConvert: Array<colConvert>;
  header?: string;
}

declare var $: any;
const ReactXLSXTableToExcel = forwardRef((props: IProps, ref) => {
  const tableRef = props.refTable || $("#" + props.table);

  const convertStringToFloatSheet = (ws, index: number, keyCheck: string, typeConvert: string) => {
    //ws = > is Obj
    //get key of ws obj in position: index
    let key = Object.keys(ws)[index];
    //check key include key check and is number type string
    if (key.includes(keyCheck) && ws[key] && regex.test(ws[key].v)) {
      // convert
      ws[key].t = typeConvert; // change type string :s , number:n
      switch (typeConvert) {
        case "n":
          return (ws[key].v = parseFloat(ws[key].v));
        case "s":
          return (ws[key].v = ws[key].v.toString());
        default:
          return ws[key].v;
      }
    }
  };

  //convert data binary type
  const convertData = s => {
    // let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(new ArrayBuffer(s.length));
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return view;
  };
  //regex check string is only number and float
  const regex = /^[+-]?\d+(\.\d+)?$/;

  const handleExport = () => {
    //create new sheet book
    var wb = XLSX.utils.book_new();
    wb.SheetNames.push("Sheet 1"); // name sheet

    var ws = XLSX.utils.table_to_sheet(tableRef.current, { raw: props.raw, display: false }); // raw is all convert string data

    //header fitSize
    if (props.header) {
      let wsCol = [];
      let wsHeader = XLSX.utils.table_to_sheet(tableRef.current, { raw: props.raw, sheetRows: parseInt(props.header) });
      for (let i = 0; i < Object.keys(wsHeader).length; i++) {
        if (Object.keys(wsHeader)[i].includes(props.header) && wsHeader[Object.keys(wsHeader)[i]].v) {
          wsCol.push({ wch: wsHeader[Object.keys(wsHeader)[i]].v.length });
        }
      }
      ws["!cols"] = wsCol;
    }
    //convert data string to number
    for (let i = 0; i < Object.keys(ws).length; i++) {
      props.colConvert.forEach(value => {
        value.cols.forEach(item => {
          convertStringToFloatSheet(ws, i, item, value.type);
        });
      });
    }
    // console.log(wsCol)
    wb.Sheets["Sheet 1"] = ws;

    var wbout = XLSX.write(wb, { bookType: "xlsx", bookSST: true, type: "binary" });

    saveAs(new Blob([convertData(wbout)], { type: "application/octet-stream" }), props.filename + ".xlsx");
  };

  useImperativeHandle(ref, () => ({
    handleExport() {
      //create new sheet book
      handleExport();
    },
  }));
  return (
    <>
      <button id={props.id} className={props.className} type="button" onClick={handleExport}>
        {props.buttonText}
      </button>
    </>
  );
});
export default ReactXLSXTableToExcel;
