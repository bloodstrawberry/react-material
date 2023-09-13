import React, { useEffect } from "react";

import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";
import Box from "@mui/material/Box";

const data = [
  ["", "Tesla", "Nissan", "Toyota", "Honda", "Mazda", "Ford"],
  ["2017", 10, 11, 12, 13, 15, 16],
  ["2018", 10, 11, 12, 13, 15, 16],
  ["2019", 10, 11, 12, 13, 15, 16],
  ["2020", 10, 11, 12, 13, 15, 16],
  ["2021", 10, 11, 12, 13, 15, 16],
];

const initData = () => {
  let row = [];
  for (let i = 0; i < 100; i++) {
    row.push(String.fromCharCode("A".charCodeAt() + (i % 26)));
  }

  let table = [];
  for (let k = 0; k < 100; k++) {
    let tmp = JSON.parse(JSON.stringify(row));
    let number = `${k + 1}`;
    for (let i = 0; i < 100; i++)
      tmp[i] = `${tmp[i]}${number.padStart(3, "0")}`;
    table.push(tmp);
  }

  return table;
};

const myAfterChangesObserved = () => {
  console.log("change!");
};

// 최적화 https://handsontable.com/docs/6.2.2/tutorial-good-practices.html
// useState 예시 https://handsontable.com/docs/6.2.2/frameworks-wrapper-for-react-simple-examples.html

let searchResultCount = 0;
function searchResultCounter(instance, row, col, value, result) {
  const DEFAULT_CALLBACK = function(instance, row, col, data, testResult) {
    instance.getCellMeta(row, col).isSearchResult = testResult;
  };

  DEFAULT_CALLBACK.apply(this, arguments);

  if (result) {
    searchResultCount++;
  }
}

function redRenderer(instance, td) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  td.style.backgroundColor = "red";
  td.style.fontWeight = "bold";
}


const options = {
  data : initData(),

  /* true or false options */
  colHeaders: true,
  rowHeaders: true,
  wordWrap: false, /* 줄 바꿈 off */
  manualColumnResize: true,
  manualRowResize: true, 
  manualColumnMove: true,
  manualRowMove: true,
  allowInsertColumn: true,
  allowInsertRow: true,
  allowRemoveColumn: true,
  allowRemoveRow: true, 
  autoWrapCol: true, /* 마지막 셀 아래에서 다음 셀 위로 이동 */
  autoWrapRow: true, /* 마지막 셀 옆에서 다음 셀 처음으로 이동 */
  dragToScroll: true, /* 표를 클릭 후 드래그를 할 때, 같이 스크롤 되는지 여부 */
  persistentState: false, /* 열 정렬 상태, 열 위치 및 열 크기를 로컬 스토리지에 저장 */
  outsideClickDeselects: true, /* 셀 외부 클릭 시, 셀 선택 해제 */
  readOnly: false, /* true : 모든 셀을 readOnly로 설정*/
  enterBeginsEditing: false, /* true : 엔터 클릭 시 편집 모드, false : 다음 셀로 이동 */
  copyable: true, /* 복사 가능 여부 */
  copyPaste: true, /* 복사, 붙여넣기 가능 여부 */
  undo: true, /* false : ctrl + z 비활성화 */
  trimWhitespace: false, /* 자동 trim() 실행 후 셀에 저장 */
  contextMenu: true, /* 마우스 왼쪽 버튼 클릭 시 컨텍스트 메뉴 */
  comments: false, /* 주석, 메모 기능 context menu에 추가 */
  manualColumnFreeze: true, /* freezeColumn context menu에 추가 */

  observeChanges: true,
  afterChangesObserved: () => {
    console.log("change !!");
  },

  // filters: true /* 필터 기능 on 6.2.2 pro  */,
  // dropdownMenu: true /* dropdown 메뉴 설정 6.2.2 pro */,
  
  /* Selected Options */
  className: "htMiddle htCenter", /* Cell Alignment */
  //stretchH: "none", /* 빈 공간을 채우는 방법 : none, last, all */
  //selectionMode: "multiple", /* Ctrl 키 + 선택 가능한 셀 : multiple, range, single */
  //fillHandle : true, /* 드래그로 자동 채움 : true, false, vertical, horizontal 옵션 */
  //disableVisualSelection: "current", /* 셀 선택 활성화 여부 : false, true, current, area, header, [option1, option2, ...] */

  /* Number Options */
  width: 1000,
  height: 1000,
  
  //startRows: 3, /* data가 없는 경우 기본 설정 */
  //startCols: 5, /* data가 없는 경우 기본 설정 */

  // maxCols: 2, /* 주어진 값보다 큰 Column은 제거 */
  // maxRows: 3, /* 주어진 값보다 큰 Row는 제거 */

  //minCols: 5,
  //minRows: 5,

  //minSpareRows: 1, /* 빈 열 자동 추가 */
  //minSpareCols: 2, /* 빈 행 자동 추가 */

  //fixedColumnsLeft: 2,
  //fixedRowsTop: 3,
  //fixedRowsBottom: 2,
  
  
  //rowHeaderWidth: 250, // 행 헤더 너비


  /* Customizing Options */
  colWidths: 60, //[60, 120, 60, 60, 60, 60, 60], //[]
  // rowHeights : 50,//[]
  //placeholder: 'Empty Cell',
    // columnSorting: {
  //   sortEmptyCells: true,
  //   initialConfig: {
  //     column: 2,
  //     sortOrder: 'asc'
  //   }
  // },





  //comments: true, // 탭을 누르면 어느정도 해결되긴함...
  // comments: {
  //   displayDelay: 10000
  // },
  // cell: [
  //   {row: 1, col: 1, comment: {value: 'Some comment'}},
  //   {row: 2, col: 2, comment: {value: 'More comments'}},
    
  // ],

  // 6.2.2 미지원
  // beforeSetCellMeta:(row, col, key, value) => {
  //   console.log("before",row, col, key, value);
  // },

  // afterChange: function(change, source) {
  //   console.log(change, source);
  //   //change [row, col, before, after];
  // },

  afterSetCellMeta: (row, col, key, value) => {
    console.log(row, col, key, value);
    console.log(this);
  },

  //margeCells: true,
  // mergeCells: [
  //   // rowspan and colspan properties declare the width and height of a merged section in cells
  //   {row: 1, col: 1, rowspan: 3, colspan: 3},
  //   {row: 3, col: 4, rowspan: 2, colspan: 2},
  //   {row: 5, col: 6, rowspan: 3, colspan: 3}
  // ],



  search: {
    callback: searchResultCounter,
    //queryMethod: myNewQueryMethod,
    //searchResultClass: 'customClass'
  },

  // columns: [
  //     {data: "id", type: 'numeric'},
  //     // 'text' is default, you don't actually need to declare it
  //     //{data: "name", renderer: yellowRenderer},
  //     // use default 'text' cell type but overwrite its renderer with yellowRenderer
  //     {data: "isActive", type: 'checkbox'},
  //     {data: "date", type: 'date', dateFormat: 'YYYY-MM-DD'},
  //     {data: "color",
  //       type: 'autocomplete', // dropdown
  //       source: ["yellow", "red", "orange", "green", "blue", "gray", "black", "white"]
  //     },
  //     {
  //       editor: 'select',
  //       selectOptions: ['Kia', 'Nissan', 'Toyota', 'Honda']
  //     },
  //   ],

  // cell: [
  //   {row: 0, col: 0, readOnly: true}
  // ],

  // cells: function(row, col, prop) {
  //   var cellProperties = {};

  //   if (row === 0 && col === 0) {
  //     //특정 셀만 가능한 종류 찾기 
  //     //cellProperties.readOnly = true;
  //     cellProperties.wordWrap = true;

  //     //cellProperties.background = "red";
  //     cellProperties.className = "htCenter htMiddle";
  //     cellProperties.renderer = redRenderer; //함수화 해보기
  //     //cellProperties.comment = {value : "zzzz"};
  //   }

  //   if (col === 5) {
  //     this.type = "dropdown";
  //     this.source = ["a", "b", "c"];
  //   }

  //   return cellProperties;
  // },

  licenseKey: "non-commercial-and-evaluation",
};

const options2 = {
  data,
  rowHeaders: true,
  colHeaders: true,
  contextMenu: true,
  allowRemoveRow: false,
  comments: true,
  cell: [
    {row: 1, col: 1, comment: {value: 'Some comment'}},
    {row: 2, col: 2, comment: {value: 'More comments'}}
  ],
  licenseKey: "non-commercial-and-evaluation",
}

const CustomHansOnTable = ({ data, customOptions }) => {
  //options.manualColumnMove = false;
  const makeTable = () => {
    const container = document.getElementById("hot-app");
    container.innerHTML = "";
    const myTable = new Handsontable(container, options);
    //myTable.helper.createSpreadsheetData(6, 10);
    //myTable.selectAll();
    
    //myTable.setCellMeta(1, 1, 'comment', {value :" zzzz"});

    // myTable.addHook('beforeSetCellMeta', function (row, col, key, value) {
    //   // Handsontable 인스턴스에 접근
    //   // console.log('Handsontable 인스턴스에 접근:', myTable);
    //   // console.log(value, value === '');
    //   // if(value.value === "") {
    //   //   console.log("here??");
    //   //   myTable.setCellMeta(row, col, 'comment', {value :"temp"});
    //   // }
    //   console.log(row, col, key, value);
    // });

    //myTable.render();

    

    return;
    let searchFiled4 = document.getElementById("search_field4");
    let resultCount = document.getElementById("resultCount");

    Handsontable.dom.addEvent(searchFiled4, "keyup", function(event) {
      searchResultCount = 0;

      var search = myTable.getPlugin("search");
      var queryResult = search.query(this.value);

      console.log(queryResult);
      resultCount.innerText = searchResultCount.toString();
      myTable.render();
      myTable.getDataAtCell(0, 1);
    });
  };

  useEffect(() => {
    makeTable();
  }, []);

  return (
    <div>
      <Box sx={{ m: 2 }}>
        {/* <input id="search_field4" type="search" placeholder="Search" />
        <p>
          <span id="resultCount">1</span> results
        </p> */}
        <div id="hot-app"></div>
      </Box>
    </div>
  );
};

export default CustomHansOnTable;
