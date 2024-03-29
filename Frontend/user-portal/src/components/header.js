import React, { useState } from "react";
import {useMsal} from "@azure/msal-react";
import {useNavigate} from "react-router-dom";
import '../App.css'
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { Modal } from "antd";
import { useUser } from "../utils/customHooks";

const Header = () => {
  const {user} = useUser();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { instance } = useMsal();  // const { accounts } = useMsal();
  // const account = accounts[0];
  //   const name = account?.name ?? "";
  const [showNavColor, setShowNavColor] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload(false);
    // instance
    //   .logoutPopup({
    //     postLogoutRedirectUri: "/login",
    //     mainWindowRedirectUri: "/login",
    //   })
    //   .catch((error) => console.log(error));
    // navigate("/login");
  };
  
  return (
    <MDBNavbar expand="lg" light style={{ backgroundColor: '#EEE9DA' }}>
      <MDBContainer fluid>
        <MDBNavbarBrand href="/home">
          {" "}
          <img
            src="../bme.svg"
            alt=""
            style={{ width: "160px", height: "5vh" }}
          />
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle"
          onClick={() => setShowNavColor(!showNavColor)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={showNavColor} navbar >
          <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
            <MDBNavbarNav className="me-auto mb-2 mb-lg-0 d-flex justify-content-end">
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle
                    tag="a"
                    className="nav-link d-flex align-items-center"
                    href="#"
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img(31).webp"
                      className="rounded-circle"
                      height="47"
                      alt="Avatar"
                      loading="lazy"
                    />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem>
                      <MDBNavbarLink onClick={() => setOpen(true)}>Details</MDBNavbarLink>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <MDBNavbarLink onClick={handleLogout}>
                        Logout
                      </MDBNavbarLink>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
      <Modal
      okType='default'
        title="User Details"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={500}
      >
        <p className="mt-3">User Name: {user?.username}</p>
        <p >Full name:  {user?.firstname}  {user?.lastname}</p>
        <p>Email:  {user?.email}</p>
      </Modal>
    </MDBNavbar>
  );
};

export default Header;
