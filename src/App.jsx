import "./App.css";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const getUser = async () => {
    setLoading(true);
    try {
      const data = await axios.get(
        "https://602e7c2c4410730017c50b9d.mockapi.io/users"
      );
      const newData = await data.data;
      setUserData(newData);
      console.log(newData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
      setLoading(false);
    }
  };
  const setUserDetails = (id) => {
    const current = userData.filter((data) => data.id === id);
    console.log(current);
    setCurrentUser(current);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <div className="mainHeader" style={{ textAlign: "center" }}>
        {loading && (
          <>
            <h3>Loading</h3>
            <CircularProgress size={30} />
          </>
        )}
        {error && <h3>Error in Laoding Data</h3>}
      </div>
      <Grid container spacing={3} className="container">
        <Grid item xs={12} md={6}>
          <div className="header">
            <h3>Users List</h3>
          </div>
          {loading && <div style={{ textAlign: "center" }}>Fetching Users</div>}
          {error ? (
            <div style={{ textAlign: "center" }}>Error Occured in Loading</div>
          ) : userData.length === 0 ? (
            !loading && (
              <div style={{ textAlign: "center" }}>No Data to display</div>
            )
          ) : Array.isArray(userData) ? (
            userData?.map((data) => {
              return (
                <div
                  className="contact"
                  key={data.id}
                  onClick={() => setUserDetails(data.id)}
                >
                  <img
                    src={data.avatar}
                    alt="avatar"
                    width={30}
                    style={{ marginRight: 20 }}
                  />
                  <p>{data.profile.username}</p>
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: "center" }}>Invalid Data type</div>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="header">
            <h3>Users List</h3>
          </div>
          {currentUser.length === 0 ? (
            <div className="contact-details">No User Selected</div>
          ) : (
            <div className="contact-details">
              <img
                src="https://cdn.fakercloud.com/avatars/laasli_128.jpg"
                alt="avatar"
                width={30}
              />
              <p className="username">@{currentUser[0].profile.username}</p>
              <div className="text description">
                <p>{currentUser[0].Bio}</p>
              </div>
              <div className="text">
                Full Name
                <p>{`${currentUser[0].profile.firstName} ${currentUser[0].profile.lastName}`}</p>
              </div>
              <div className="text">
                Job Title
                <p>{currentUser[0].jobTitle}</p>
              </div>
              <div className="text">
                Email
                <p>{currentUser[0].profile.email}</p>
              </div>
              {/* <p>{data.profile.username}</p> */}
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default App;
