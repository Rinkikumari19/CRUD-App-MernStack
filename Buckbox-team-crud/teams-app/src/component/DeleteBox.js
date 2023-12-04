import React from "react";
import { DialogContent, DialogTitle, Dialog } from "@material-ui/core";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function DeleteBox({ openModal, handleClose, handleDelete }) {
  return (
    <div>
      <Dialog open={openModal.open3} onClose={handleClose}>
        <div className="d-flex">
          <DialogTitle>Are you sure to delete?</DialogTitle>
          <HighlightOffIcon className="close-icon" onClick={handleClose} />
        </div>
        <DialogContent style={{ textAlign: "center" }}>
          <button style={{ background: "#dd0707" }} onClick={handleDelete}>
            Delete
          </button>
          <button onClick={handleClose}>Cancel</button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
