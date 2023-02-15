import * as React from 'react';
import './Home.css'
import { Link,useNavigate } from 'react-router-dom'
import { useEffect ,useState} from 'react';
import axios from "axios";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { Avatar } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { height } from '@mui/system';
export default function StickyHeadTable() {
    const navigate=useNavigate();
   const[user,setuser]=useState([]);
   const[filteruser,setfilteruser]=useState([]);
  const [page, setPage] = React.useState(0);
  const[search,setsearch]=useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  console.log(search);
  useEffect(()=>{
    const fetch=async()=>{
    let headersList = {
     "Accept": "*/*",
    }
    
    let reqOptions = {
      url: "https://dummyjson.com/users",
      method: "GET",
      headers: headersList,
    }
    
    let response = await axios.request(reqOptions);
    console.log(response.data.users);
    setuser(response.data.users);
    setfilteruser(response.data.users);
    }
    fetch();
    },[])

// console.log(user?.map((item)=>item.firstName));
// console.log(user.filter((item)=>
//     item.firstName.toLowerCase().includes("a")
// ))


    const SearchFunc=()=>{
    let temp=(user.filter((item)=> item.firstName.toLowerCase().includes(search) ||
    item.firstName.toLowerCase().includes(search) || item.lastName.toLowerCase().includes(search) || item.email.toLowerCase().includes(search)))
    setfilteruser(temp); 
}
    
  

  const data=(e)=>{
    setsearch(e.target.value);
  }

  useEffect(()=>{
    SearchFunc();
  },[search])
    

  const columns = [
    { id: 'image', label: 'Avatar', minWidth: 60 , renderCell: (params) => <Avatar src={params.row.image} />},

    { id: 'username', label: 'User', minWidth: 100 },
    { id: 'firstname', label: 'Firstname', minWidth: 100 },
    { id: 'lastname', label: 'Lastname', minWidth: 100 },
    {
      id: 'email',
      label: 'Email',
      minWidth: 100,
    //   align: 'center ',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'gender',
      label: 'Gender',
      minWidth: 50,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'age',
      label: 'Age',
      minWidth: 30,
      align: 'right',
      // format: (value) => value.toFixed(2),
    },
  ];
  
  function createData(image,username,firstname, lastname,email, gender,age) {
    return {image,username,firstname, lastname,email, gender,age};
  }
  
  const rows = filteruser.map(item=>{
    return createData( <img style={{width:'40px', height:'40px',borderRadius: '50%' ,background:'grey'}} src={item.image} alt="Image Description" />
    ,`${item.username}`,`${item.firstName}`, `${item.lastName}`, `${item.email}`,    `${item.gender}`,`${item.age}`)
  })
   
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
const logout=()=>{
navigate('/login');
}
  return (
    <>
    <div className="navbar">
        <div className="Fre"><h2>Frejun Task</h2></div>
        <button className='but' onClick={logout}><h3>Logout</h3></button>
    </div>

    <input type="text" className='search' value={search} onChange={data} placeholder='Search' />
    <div className='container'>
    <Paper sx={{ width: '70%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth ,background:'#FEF9F3' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
    </>
  );
}