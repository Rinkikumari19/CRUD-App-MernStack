import React from "react";
import { DialogContent, DialogTitle, Dialog } from "@material-ui/core";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function StatusModal({ openModal, handleClose, statusData }) {
  return (
    <div>
      <Dialog open={openModal.open2} onClose={handleClose}>
        <div className="d-flex">
          <DialogTitle>{statusData}</DialogTitle>
          <HighlightOffIcon className="close-icon" onClick={handleClose} />
        </div>

        <DialogContent style={{ textAlign: "center" }}>
          <img
            className="profile-img"
            src="https://cdn-icons-png.flaticon.com/512/5610/5610944.png"
            alt=""
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
