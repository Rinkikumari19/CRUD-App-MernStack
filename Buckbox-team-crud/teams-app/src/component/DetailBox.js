import React from "react";
import { DialogContent, DialogTitle, Dialog } from "@material-ui/core";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function DetailBox({ openModal, handleClose, teamsInfo }) {
  return (
    <div>
      <Dialog open={openModal.open} onClose={handleClose}>
        <div className="d-flex">
          <DialogTitle>{teamsInfo.name}'s Information</DialogTitle>
          <HighlightOffIcon className="close-icon" onClick={handleClose} />
        </div>

        <DialogContent>
          <div style={{ textAlign: "center" }}>
            <img
              src={teamsInfo.profileImg}
              className="profile-img"
              alt={teamsInfo.name}
            />
          </div>
          <ul>
            <li>
              <b>ID:</b> &nbsp; {teamsInfo._id}
            </li>
            <li>
              <b>Name:</b> &nbsp;{teamsInfo.name}
            </li>
            <li>
              <b>Age:</b> &nbsp;{teamsInfo.age}
            </li>
            <li>
              <b>Gender:</b> &nbsp;{teamsInfo.gender}
            </li>
            <li>
              <b>Country: </b>&nbsp;{teamsInfo.country}
            </li>
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
}
