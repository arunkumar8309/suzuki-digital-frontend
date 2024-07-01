import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  BsFillTrashFill,
  BsFillPencilFill,
  BsFillEyeFill,
} from "react-icons/bs";
import { fetchData, deleteData } from "./../Api/api";
import "./UserListStyle.css";

const UserList = () => {
  const navigate = useNavigate();
  const [userAllDetailData, setAllUserDetailData] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchDataAndUpdate = async () => {
    try {
      const response = await fetchData("getalluser");
      setAllUserDetailData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataAndUpdate();
  }, []);

  const handleDeleteRow = async (targetId) => {
    try {
      await deleteData(`deleteuser/${targetId}`);
      const updatedData = userAllDetailData.filter(
        (user) => user._id !== targetId
      );
      setAllUserDetailData(updatedData);

      // Update current page if necessary
      const updatedTotalPages = Math.ceil(updatedData.length / itemsPerPage);
      if (currentPage > updatedTotalPages) {
        setCurrentPage(updatedTotalPages);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEditRow = (targetId) => {
    localStorage.setItem("use_id", targetId);
    navigate("/userEdit");
    setRowToEdit(targetId);
  };

  const handleViewRow = (targetId) => {
    localStorage.setItem("use_id", targetId);
    navigate("/userDetails");
    setRowToEdit(targetId);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userAllDetailData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(userAllDetailData.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="table-wrapper">
      <div className="new-user-btn">
        <Link to="/">
          <button>Create New User</button>
        </Link>
      </div>
      {currentItems.length > 0 ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th style={{ textAlign: "start" }}>User Name</th>
                <th style={{ textAlign: "start" }}>Interest</th>
                <th style={{ textAlign: "start" }}>Age</th>
                <th style={{ textAlign: "start" }}>Email</th>
                <th style={{ textAlign: "start" }}>Mobile No</th>
                <th className="expand">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.user}</td>
                  <td>{row.interest}</td>
                  <td>{row.age}</td>
                  <td>{row.email}</td>
                  <td>{row.mobile}</td>
                  <td className="fit">
                    <span className="actions">
                      <BsFillEyeFill
                        className="view-btn"
                        onClick={() => handleViewRow(row._id)}
                      />
                      <BsFillTrashFill
                        className="delete-btn"
                        onClick={() => handleDeleteRow(row._id)}
                      />
                      <BsFillPencilFill
                        className="edit-btn"
                        onClick={() => handleEditRow(row._id)}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev.
            </button>
            <ul>
              {[...Array(totalPages).keys()].map((number) => (
                <li
                  key={number + 1}
                  className={currentPage === number + 1 ? "active" : ""}
                  onClick={() => handlePageClick(number + 1)}
                >
                  {number + 1}
                </li>
              ))}
            </ul>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="no-data-found">
          <div className="no-data-found-sub">
            <h1>No User Data Found. Please add a User.</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
