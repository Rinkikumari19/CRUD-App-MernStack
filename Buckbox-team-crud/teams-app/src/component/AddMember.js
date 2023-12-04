import React from "react";
import { DialogContent, DialogTitle, Dialog } from "@material-ui/core";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { gender } from "../utils/common";

export default function AddMember({
  openModal,
  handleClose,
  addteamsInfo,
  handleChange,
  isEdit,
  addimgUrl,
  handleUpdate,
  handleSubmit,
  errors,
  disable,
}) {
  return (
    <div>
      <Dialog open={openModal.open1} onClose={handleClose}>
        <div className="d-flex">
          <DialogTitle>
            {isEdit ? "Update your Details" : "Add Team Member Details"}
          </DialogTitle>
          <HighlightOffIcon className="close-icon" onClick={handleClose} />
        </div>

        <DialogContent>
          <div className="input-div">
            <label>Name: &nbsp;</label>
            <input
              name="name"
              value={addteamsInfo.name}
              className="team-input"
              placeholder="Enter Team Name"
              onChange={handleChange}
            />
            {errors.name && <p className="error-msg">{errors.name}</p>}
          </div>
          <div className="input-div">
            <label>Age: &nbsp;</label>
            <input
              name="age"
              className="team-input"
              value={addteamsInfo.age}
              placeholder="Enter Team Age"
              onChange={handleChange}
            />
            {errors.age && <p className="error-msg">{errors.age}</p>}
          </div>

          <div className="input-div">
            <label>Gender: &nbsp;</label>
            <select
              value={addteamsInfo.gender}
              className="team-input select-width"
              name="gender"
              onChange={handleChange}
            >
              <option value={""}>Select Gender</option>
              {gender.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors.gender && <p className="error-msg">{errors.gender}</p>}
          </div>

          <div className="input-div">
            <label>Country: &nbsp;</label>
            <input
              name="country"
              className="team-input"
              value={addteamsInfo.country}
              placeholder="Enter Country Name"
              onChange={handleChange}
            />
            {errors.country && <p className="error-msg">{errors.country}</p>}
          </div>
          <div className="input-div">
            <label>Upload Profile: &nbsp;</label>
            <div>
              <input
                name="profileImg"
                className="team-input"
                placeholder="Upload profile img"
                type="file"
                onChange={handleChange}
              />
              {errors.profileImg && (
                <p className="error-msg-img">{errors.profileImg}</p>
              )}
            </div>
          </div>
          {addteamsInfo.profileImg && (
            <div style={{ textAlign: "center" }}>
              <img
                src={
                  addimgUrl.profileImg
                    ? addimgUrl.profileImg
                    : addteamsInfo.profileImg
                }
                className="profile-img"
                alt={""}
              />
            </div>
          )}

          <div className="sub-btn">
            {isEdit ? (
              <button onClick={handleUpdate} disabled={disable}>
                Update
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={disable}>
                Submit
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
