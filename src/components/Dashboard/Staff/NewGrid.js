/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import accountant from './assets/accountant.jpg';
import manager from './assets/manager.jpg';
import guest from './assets/guest.jpg';
import admin from './assets/admin.jpg';
import { Edit } from '@mui/icons-material';
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
import { Pressable } from 'react-native';
//import { tasks, employees, priorities } from './demo-data/tree-data.'
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Button from '@mui/material/Button';
//import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LINK_TO_BACKEND } from '../../../var';
import {useDispatch} from 'react-redux'
import {reduxRemoveStaff} from '../../../redux/DataStaff'
const getChildRows = (row, rows) => {
 // const childRows = rows.filter(r => r.productName === (row ? row.productName : null ));
  //return childRows.length ? childRows : null
  return (
    <>
    </>
  )

};

export default function NewGrid(props){
  const dispatch=useDispatch()

  const del=async (identifier)=>{
    await axios({
        method:'post',
        headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
        url:`${LINK_TO_BACKEND}staff/removeThroughManager`,
        data:{idstaff:identifier}
    }).then((response)=>{
      window.location.reload(false)
      console.log(response)
  })
 //dispatch(reduxRemoveStaff(identifier))
}
  const actions= (element) =>{
    const [decision,setDecision]=React.useState(false);
    const [certain,setCertain]=React.useState(false);
  
    return (
      <Stack direction="row" spacing={2}>
      
        {!decision?<Button onClick={()=>{setDecision(true),setTimeout(()=>{setCertain(true)},3000)}} color="error" variant="outlined" startIcon={<PersonOffIcon />}>
          Revoke
        </Button>:null}
        {decision?<><Typography>Are You sure?</Typography>{!certain?<Button variant="outlined" disabled>Yes</Button>:<Button variant="outlined" onClick={()=>{del(element.row.id)}}>Yes</Button>}<Button variant="outlined" onClick={()=>{setDecision(false)}}>No</Button></>:null}
   
      </Stack>
    );
  }
    const EmployeeFormatter = (element) => (
        <div
          style={{
            display: 'flex',
          //  justifyContent:"space-between"
          }}
        ><div
        style={{
            display: 'inline-block',
            margin: '-8px 8px -8px 8px',
            textAlign: 'center',
          }}>
          {/* <div
            style={{
              display: 'inline-block',
              background: 'white',
              borderRadius: '3px',
              width: '60px',
              height: '30px',
              margin: '-8px 8px -8px 0',
              textAlign: 'center',
            }}
          > */}
            {/* <img
              src={element.row.role==="manager"?manager:(element.row.role==="admin"?admin:(element.row.role==="accountant"?accountant:guest))}
              style={{
                height: '30px',
                margin: '0 auto',
              }}
              alt="Avatar"
            /> */}
            <Pressable children={()=><Edit onClick={()=>{props.openmodal(props.state),props.cb(element.row)}}/>}/>
            
          </div>
          
          {element.row.role}
         {/* {rows.find(e => e.productImage === element.productImage).productName} */}
        </div>
      );

  const [columns] = useState([
    // { name: 'type', title: 'Category' },

    { name: 'role', title: 'Role', getCellValue: row => rows.find(p => p.role === row.role).role },
    { name: 'name', title: 'Employee Name', getCellValue: row => rows.find(e => e.name === row.name).name },
    { name: 'email', title: 'Email',getCellValue: row=>rows.find(e=>e.email===row.email).email },
     { name: 'id', title: 'ID', getCellValue: row => `${row.id}` },
     {name: 'actions', title: 'actions', getCellValue:row=>""}
  //   { name: 'expires', title: 'Expiry Date', getCellValue: row => `${row.expires}` },
    // { name: 'Due_Date', title: 'Due Date', getCellValue: row => row.Due_Date.split('T')[0] },
 //   {name: "refrigerate",title: "Refrigerate",getCellValue: row =>row.refrigerate===1?"yes":"no" },
 //   {name: "prescOnly",title: "Prescription",getCellValue: row =>row.prescOnly===1?"yes":"no" },
 //   {name: "qty",title:"Quantity",getCellValue:row=>`${row.qty}`},
 //   {name: 'providers',title:'Provider ID',getCellValue:row=>`${row.providers}`}
  ]);
  const [rows] = useState(props.data);
  const [pageSizes] = useState([5, 10, 20]);
  const [defaultColumnWidths] = useState([
    { columnName: 'role', width: 300 },
    { columnName: 'name', width: 120 },
    { columnName: 'email', width: 300 },
    { columnName: 'id', width: 120 },
    {columnName:'actions',width:300}
  
  // { columnName: 'expires', width: 100 },
   // { columnName: 'refrigerate', width: 120 },
   // { columnName: 'prescOnly', width: 120 },
   // {columnName: 'qty', width: 120},
   // {columnName: 'providers',width:100}
  ]);
  const [defaultHiddenColumnNames] = useState([]);
  const [tableColumnExtensions] = useState([
    { columnName: 'Completion', align: 'right' },
  ]);
  const [productColumn] = useState(['role']);
  const [actionColumn]=useState(['actions'])
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
