/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  DataTypeProvider,
  TreeDataState, SortingState, SelectionState, FilteringState, PagingState,
  CustomTreeData, IntegratedFiltering, IntegratedPaging, IntegratedSorting, IntegratedSelection,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table, TableHeaderRow, TableFilterRow, TableTreeColumn,
  PagingPanel, TableColumnResizing, Toolbar, TableColumnVisibility, ColumnChooser,
} from '@devexpress/dx-react-grid-material-ui';
import axios from 'axios';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
//import { tasks, employees, priorities } from './demo-data/tree-data.'



const getChildRows = (row, rows) => {
 // const childRows = rows.filter(r => r.productName === (row ? row.productName : null ));
  //return childRows.length ? childRows : null
  return (
    <>
    </>
  )

};

export default function NewGrid(props){
  const actions= (element) =>{
    return (
      <Stack direction="row" spacing={2}>
        <Button onClick={()=>{props.updateHook(element.row),props.callbackUpdate(true)}} variant="contained" endIcon={<Edit />}>
          Edit
        </Button>
        {/* <Button onClick={()=>{axios.post('http://localhost:4000/deletedsuppliers/addDeletion',{idprovider:element.row.id,companyname:element.row.companyname,email:element.row.email,phoneNumber:element.row.phoneNumber,providerImage:element.row.providerImage}).then(()=>{window.location.reload(false)})}} color="error" variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button> */}
        <Button onClick={()=>{props.setIsDeleting(true),props.setToDelete({companyname:element.row.companyname,id:element.row.id,email:element.row.email,phoneNumber:element.row.phoneNumber,providerImage:element.row.providerImage})}} color="error" variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button>
   
      </Stack>
    );
  }
    const EmployeeFormatter = (element) => (
        <div
          style={{
            display: 'flex',
          //  justifyContent:"space-between"
          }}
        >
          <div
            style={{
              display: 'inline-block',
              background: 'white',
              borderRadius: '3px',
              width: '90px',
              height: '30px',
              margin: '-8px 8px -8px 0',
              textAlign: 'center',
              contain:"strict"
            }}
          >
            <img
              src={element.row.providerImage}
              style={{
                height: '30px',
                margin: '0 auto',
              }}
              alt="Avatar"
            />
          </div>
          
          {element.row.companyname}
         {/* {rows.find(e => e.productImage === element.productImage).productName} */}
        </div>
      );

  const [columns] = useState([
    // { name: 'type', title: 'Category' },
    { name: 'companyname', title: 'Company', getCellValue: row => rows.find(e => e.companyname === row.companyname).companyname },
    { name: 'phoneNumber', title: 'Phone',getCellValue: row=>rows.find(e=>e.phoneNumber===row.phoneNumber).phoneNumber },
    { name: 'email', title: 'email', getCellValue: row => rows.find(p => p.email === row.email).email },
     { name: 'id', title: 'ID', getCellValue: row => `${row.id}` },
     {name: 'actions' ,title:"actions",getCellValue:row=>""}
    //  { name: 'expires', title: 'Expiry Date', getCellValue: row => `${row.expires}` },
    // // { name: 'Due_Date', title: 'Due Date', getCellValue: row => row.Due_Date.split('T')[0] },
    // {name: "refrigerate",title: "Refrigerate",getCellValue: row =>row.refrigerate===1?"yes":"no" },
    // {name: "prescOnly",title: "Prescription",getCellValue: row =>row.prescOnly===1?"yes":"no" },
    // {name: "qty",title:"Quantity",getCellValue:row=>`${row.qty}`},
    // {name: 'providers',title:'Provider ID',getCellValue:row=>`${row.providers}`}
  ]);
  const [rows] = useState(props.data);
  const [pageSizes] = useState([5, 10, 20]);
  const [defaultColumnWidths] = useState([
    { columnName: 'companyname', width: 300 },
    { columnName: 'email', width: 200 },
    { columnName: 'id', width: 120 },
    { columnName: 'phoneNumber', width: 220 },
  {columnName:'actions',width:300}
//    { columnName: 'expires', width: 100 },
//     { columnName: 'refrigerate', width: 120 },
//     { columnName: 'prescOnly', width: 120 },
//     {columnName: 'qty', width: 120},
//     {columnName: 'providers',width:100}
  ]);
  const [defaultHiddenColumnNames] = useState([]);
  const [tableColumnExtensions] = useState([
    { columnName: 'Completion', align: 'right' },
  ]);
  const [productColumn] = useState(['companyname']);
  const [actionColumn]=useState(['actions']);
console.log("props.data",props.data)
console.log("rows",rows)
  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
        <DataTypeProvider
          for={productColumn}
          formatterComponent={EmployeeFormatter}
        />
         <DataTypeProvider
          for={actionColumn}
          formatterComponent={actions}
        />

        {/* <TreeDataState /> */}
        <FilteringState />
        <SortingState />
        <SelectionState />
        <PagingState
          defaultCurrentPage={0}
          defaultPageSize={pageSizes[1]}
        />

        {/* <CustomTreeData
          getChildRows={getChildRows}
        /> */}
        <IntegratedFiltering />
        {/* <IntegratedSelection /> */}
        <IntegratedSorting />
        <IntegratedPaging />

        <Table
        data={props.data}
          columnExtensions={tableColumnExtensions}
        />
        <TableColumnVisibility
          defaultHiddenColumnNames={defaultHiddenColumnNames}
        />
        <TableColumnResizing
          defaultColumnWidths={defaultColumnWidths}
        />
        <TableHeaderRow
          showSortingControls
        />
        <TableFilterRow />
        {/* <TableTreeColumn
          for="Subject"
          showSelectionControls
          showSelectAll
        /> */}
       

        <Toolbar />
        <ColumnChooser />

        <PagingPanel
          pageSizes={pageSizes}
        />
      </Grid>
    </Paper>
  );
};
