import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../styles/styles.css';

function UserTable() {
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(); 
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setRowData(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []);
  

  const deleteUser = async () => {
    const selectedNode = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNode.map((node) => node.data);

    if (selectedData.length === 0) {
      alert('No row selected for deletion.');
      return;
    }

    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    if (isConfirmed) {
      try {
        await axios.delete(`/api/users/${selectedData[0]._id}`);
        setRowData(rowData.filter((user) => user._id !== selectedData[0]._id));
        alert('User deleted successfully!');
      } catch (error) {
        alert(`Error deleting user: ${error.message}`);
      }
    }
  };

  const editUser = () => {
    const selectedNode = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNode.map((node) => node.data);

    if (selectedData.length === 0) {
      alert('No row selected for editing.');
      return;
    }

    navigate(`/update/${selectedData[0]._id}`);
  };

  const columnDefs = [
    { headerName: 'First Name', field: 'firstName', sortable: true, filter: true },
    { headerName: 'Last Name', field: 'lastName', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    { headerName: 'Phone', field: 'phoneNumber', sortable: true, filter: true },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center text-light mb-4">User Management</h2>

      {/* Action Buttons */}
      <div className="d-flex justify-content-start mb-3">
        <button
          className="btn btn-warning btn-sm me-2"
          onClick={editUser}
        >
          Edit {/* Select to Edit   */}
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={deleteUser}
        >
          Delete {/* Select to delete  */}
        </button>
      </div>
      

      {/* AG Grid */}
      <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            sortable: true,
            filter: true,
            flex: 1,
            minWidth: 150,
          }}
          rowSelection="single" 
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
}

export default UserTable;
