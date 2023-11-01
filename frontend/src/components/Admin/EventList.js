import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminEvent,
  deleteEvent,
} from "../../actions/eventAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layouts/MetaData.js";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_EVENT_RESET } from "../../constants/eventConstants";
import ConfirmDialog from "../deleteConfirmation/ConfirmDialog";

const EventList = ({ history }) => {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, events } = useSelector((state) => state.events);

  const { error: deleteError, isDeleted } = useSelector((state) => state.event);

  const deleteEventHandler = (id) => {
    dispatch(deleteEvent(id));
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
      alert.success("Event Deleted Successfully");
      // history.push("/admin/events");
      dispatch({ type: DELETE_EVENT_RESET });
    }

    dispatch(getAdminEvent());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Event ID", minWidth: 200, flex: 0.5 },

    {
      field: "title",
      headerName: "Title",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "Address",
      headerName: "Address",
      //   type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "Date",
      headerName: "Date",
      //   type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Fragment>
              <Link to={`/admin/event/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </Link>

              <Button
                // onClick={() =>
                //   deleteEventHandler(params.getValue(params.id, "id"))
                // }
                onClick={() => {
                  setConfirmDialog({
                    isOpen: true,
                    title: "Are you sure to delete this event ?",
                    subTitle: "You can't undo this operation",
                    onConfirm: () => {
                      deleteEventHandler(params.getValue(params.id, "id"));
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

  events &&
    events.forEach((item) => {
      rows.push({
        id: item._id,
        title: item.title,
        Address: item.Address,
        Date: item.Date,
      });
    });

  return (
    <Fragment>
      <MetaData title={`Dashboard -- All Events`} />

      <div className="dashboard">
        <SideBar />

        <div className="productListContainer">
          <div className="productListHeading">
            List Of Events
            <Link to="/admin/event" className="link">
              Add New Event
            </Link>
          </div>
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

export default EventList;
