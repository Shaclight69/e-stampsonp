import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layouts/MetaData.js";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import ConfirmDialog from "../deleteConfirmation/ConfirmDialog";

const UsersList = ({ history }) => {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, history, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 100, flex: 0.8 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.8,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.image} alt="" />
            {params.row.name}
          </div>
        );
      },
    },

    {
      field: "email",
      headerName: "Email",
      minWidth: 50,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 50,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Fragment>
              <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </Link>

              <Button
                onClick={() => {
                  setConfirmDialog({
                    isOpen: true,
                    title: "Are you sure to delete this user ?",
                    subTitle: "You can't undo this operation",
                    onConfirm: () => {
                      deleteUserHandler(params.getValue(params.id, "id"));
                    },
                  });
                }}
              >
                <DeleteIcon />
              </Button>
            </Fragment>
            <ConfirmDialog
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}
            />
          </>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
        image: item.avatar.url,
      });
    });

  return (
    <Fragment>
      <MetaData title={`Dashboard -- All Users`} />

      <div className="dashboard">
        <SideBar />

        <div className="productListContainer">
          <div className="productListHeading">List Of Users</div>
          <div className="margin">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={9}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
