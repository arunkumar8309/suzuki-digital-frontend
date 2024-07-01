import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserDetailsStyle.css";
import { FaCircleUser } from "react-icons/fa6";
import { fetchData } from "./../Api/api";
const UserDetail = () => {
  const [userDetailData, setUserDetailData] = useState([]);

  useEffect(() => {
    const Get_User_idv = localStorage.getItem("use_id");
    fetchData(Get_User_idv)
      .then((response) => {
        console.log("response 11", response);
        setUserDetailData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className="wrapper">
      <div className="container">
        {/* <img
          src="https://i.imgur.com/fR2RIvG.jpg"
          alt="Roger Federer"
          className="profile-img"
        /> */}
        <FaCircleUser
          className="profile-img"
          style={{ backgroundColor: "red" }}
        />

        <div className="content">
          <div className="sub-content">
            <h1>{userDetailData.user}</h1>
            <p>interest:- {userDetailData.interest}</p>
            <p>age:- {userDetailData.age}</p>
            <p>email:- {userDetailData.email}</p>
            <p>mobile:- {userDetailData.mobile}</p>
          </div>
          <Link to="/userList" style={{ textDecoration: "none" }}>
            <div className="btn">Back</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
