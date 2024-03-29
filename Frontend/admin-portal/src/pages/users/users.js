import React, { useEffect, useState } from "react";
import {
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
} from "mdb-react-ui-kit";
import * as api from "../../api/user.api";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get_users();
        const userData = response.data;
        setUser(userData);
        // setUser((prev) => [...prev, ...userData]);
        console.log(userData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleEditClick = (id) => {
    let path = `/userdetails/${id}`;
    navigate(path);
  };
  return (
    <div>
      <div className="mx-5">
        <br></br>
        <MDBRow>
          <MDBCol md="2">
            {" "}
            <h2>Users</h2>
          </MDBCol>
         
        </MDBRow>
      </div>
      <MDBRow className="mx-2">
        <MDBCol md="2"></MDBCol>
        <MDBCol md="8">
          <MDBTable>
            <MDBTableHead dark>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">username</th>
                <th scope="col">firstname</th>
                <th scope="col">lastname</th>
                <th scope="col">email</th>
                <th scope="col">type</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {user.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{user.id}</th>
                  <th scope="col">{user.username}</th>
                  <th scope="col">{user.firstname}</th>
                  <th scope="col">{user.lastname}</th>
                  <th scope="col">{user.email}</th>
                  <th scope="col">{user.type}</th>

                  <MDBBtn
                    className="bg-dark"
                    rounded
                    size="sm"
                    onClick={() => handleEditClick(user.id)}
                  >
                    Edit
                  </MDBBtn>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </MDBCol>
        <MDBCol md="2"></MDBCol>
      </MDBRow>
    </div>
  );
};

export default Users;
