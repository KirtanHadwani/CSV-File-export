import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import "./DataTable.css";

const DataTable = () => {
  const location = useLocation();
  useEffect(() => {
    
    apiCall();
  },[]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    setIsLoggedIn(false);
  };

  function goToLoginPage() {
    navigate("/login");
    setIsLoggedIn(true);
  }
  const [userData, userDataChange] = useState([]);

  const downloadCsv = () => {
    const separator = ",";
    const keys = Object.keys(userData[0]);
    const csv = [
      keys.join(separator),
      ...userData.map((row) => keys.map((key) => row[key]).join(separator)),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "userdata.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV downloaded Successfully", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const deleteRow = (_id) => {
    const updatedEmpdata = userData.filter((row) => row._id !== _id);

    userDataChange(updatedEmpdata);
  };

  const navigate = useNavigate();

  const apiCall = () => {
    const token = localStorage.getItem("token");
    console.log("tokennnnnn", token);
    fetch("https://login-reactapi.onrender.com/api/admin/getAdmin", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log(resp);
        userDataChange(resp.data.adminData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const filteredData = userData.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="container">
      <ToastContainer autoClose={2000} />
      <div className="card">
        <div className="card-title">
          <h2>User Data</h2>
        </div>

        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            className="search" 
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
        
        </div>

        <div className="card-body">
          <div className="divbtn">
            <Link to="employee/create" className="btn btn-success">
              Add New (+)
            </Link>

            <button className="export" onClick={downloadCsv}>
              Export
            </button>

            {isLoggedIn ? (
              <button onClick={handleLogout} className="loginbtn">
                Logout
              </button>
            ) : (
              <button onClick={goToLoginPage} className="loginbtn">
                Login
              </button>
            )}
          </div>

          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Email</td>
                <td>DOB</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user, index) => (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.dob).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-success">Edit</button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteRow(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
