import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function UserListScreen() {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, successDelete]);

  const deleteHandler = (user) => {
    if (window.confirm("Are sure to delete?")) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <div>
      <h1>Users</h1>
      {loadingDelete && <LoadingBox />}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Deleted Successfully!</MessageBox>
      )}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <td>ID</td>
              <td>NAME</td>
              <td>EMAIL</td>
              <td>IS SELLER</td>
              <td>IS ADMIN</td>
              <td>ACTION</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller ? "Yes" : "No"}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
                <td>
                  <button type="button" className="small">
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserListScreen;
