import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteBox from "./DeleteBox";
import DetailBox from "./DetailBox";
import StatusModal from "./StatusModal";
import AddMember from "./AddMember";
import { teamHeader } from "../utils/common";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { validation } from "../validation";

export default function Teams() {
  const [teamsData, setTeamsData] = useState([]);
  const [teamsInfo, setTeamsInfo] = useState({});
  const [addteamsInfo, setAddTeamsInfo] = useState({
    name: "",
    age: "",
    gender: "",
    country: "",
    profileImg: "",
  });
  const [addimgUrl, setAddImgUrl] = useState({});
  const [search, setSearch] = useState("");
  const [minAge, setMinAge] = useState("");

  const [maxAge, setMaxAge] = useState("");

  const [openModal, setOpenModal] = useState({
    open: false,
    open1: false,
    open2: false,
    open3: false,
  });
  const [errors, setErrors] = useState({});
  const [id, setId] = useState("");
  const [statusData, setStatusData] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [disable, setDisable] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    logTeamsData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function logTeamsData(pageNo) {
    const response = await fetch(
      `http://localhost:7000/buckbox-teams?page=${pageNo}&limit=${limit}`
    );
    const TeamsData = await response.json();
    setTeamsData(TeamsData.data);
    setTotalPages(TeamsData.totalPages);
  }

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    const response = await fetch(
      `http://localhost:7000/buckbox-teams?search=${e.target.value}&minAge=${minAge}&maxAge=${maxAge}&page=${page}&limit=${limit}`
    );
    const TeamsData = await response.json();
    setTeamsData(TeamsData.data);
    if (TeamsData.data.length) {
      setTotalPages(TeamsData.totalPages);
    }
  };

  const handleSearchminAge = async (e) => {
    setMinAge(e.target.value);
    const response = await fetch(
      `http://localhost:7000/buckbox-teams?search=${search}&minAge=${e.target.value}&maxAge=${maxAge}&page=${page}&limit=${limit}`
    );
    const TeamsData = await response.json();
    setTeamsData(TeamsData.data);
    if (TeamsData.data.length) {
      setTotalPages(TeamsData.totalPages);
    }
  };

  const handleSearchMaxAge = async (e) => {
    setMaxAge(e.target.value);
    const response = await fetch(
      `http://localhost:7000/buckbox-teams?search=${search}&minAge=${minAge}&maxAge=${e.target.value}&page=${page}&limit=${limit}`
    );
    const TeamsData = await response.json();
    setTeamsData(TeamsData.data);
    if (TeamsData.data.length) {
      setTotalPages(TeamsData.totalPages);
    }
  };

  const handleView = async (id) => {
    setOpenModal({
      ...openModal,
      open: true,
    });
    const response = await fetch(`http://localhost:7000/buckbox-teams/${id}`);
    const TeamsInformation = await response.json();
    setTeamsInfo(TeamsInformation);
  };

  const handleEdit = async (id) => {
    setErrors({});
    setAddImgUrl({});
    setIsEdit(true);
    const TeamsInformation = teamsData.filter((item) => item._id === id);
    setAddTeamsInfo(TeamsInformation[0]);
    setOpenModal({
      ...openModal,
      open1: true,
    });
  };

  const handleClose = () => {
    setAddTeamsInfo({
      name: "",
      age: "",
      gender: "",
      country: "",
      profileImg: "",
    });
    setOpenModal({
      open: false,
      open1: false,
      open2: false,
      open3: false,
    });
  };
  const handleAdd = () => {
    setErrors({});
    setIsEdit(false);
    setOpenModal({
      ...openModal,
      open1: true,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const tempErr = { ...errors };
    setDisable(false);

    let currentErr;

    if (e.target.type === "file") {
      const { name, files } = e.target;
      currentErr = validation(name, files[0]);

      setAddImgUrl({
        ...addimgUrl,
        [name]: URL.createObjectURL(files[0]),
      });
      setAddTeamsInfo({
        ...addteamsInfo,
        [name]: files[0],
      });
    } else {
      setAddTeamsInfo({ ...addteamsInfo, [name]: value });
      currentErr = validation(name, value);
    }
    tempErr[name] = currentErr;
    setErrors(tempErr);
  };

  const handleSubmit = async () => {
    const flag = checkError(addteamsInfo);
    if (flag) {
      setDisable(true);
      return;
    }

    let formData = new FormData();
    formData.append("name", addteamsInfo.name);
    formData.append("age", addteamsInfo.age);
    formData.append("gender", addteamsInfo.gender);
    formData.append("country", addteamsInfo.country);
    formData.append("profileImg", addteamsInfo.profileImg);
    try {
      const response = await axios.post(
        "http://localhost:7000/buckbox-teams/",
        formData
      );
      if (response.status === 200) {
        setOpenModal({
          ...openModal,
          open1: false,
        });
        setStatusData(response.data.message);
        setOpenModal({
          ...openModal,
          open1: false,
          open2: true,
        });
        logTeamsData(page);
      }
    } catch (error) {
      setErrors(error.response.data.errors);
      console.error("Error submitting data:", error.message);
    }
  };

  const handleUpdate = async () => {
    let formData = new FormData();
    formData.append("name", addteamsInfo.name);
    formData.append("age", addteamsInfo.age);
    formData.append("gender", addteamsInfo.gender);
    formData.append("country", addteamsInfo.country);
    formData.append("profileImg", addteamsInfo.profileImg);

    try {
      const response = await axios.put(
        `http://localhost:7000/buckbox-teams/${id}`,
        formData
      );
      if (response.status === 200) {
        setOpenModal({
          ...openModal,
          open1: false,
        });
        setStatusData(response.data.message);
        setOpenModal({
          ...openModal,
          open1: false,
          open2: true,
        });
        logTeamsData(page);
      }
    } catch (error) {
      setErrors(error.response.data.errors);
      console.error("Error submitting data:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:7000/buckbox-teams/${id}`
      );
      if (response.status === 200) {
        setStatusData(response.data.message);
        setOpenModal({
          ...openModal,
          open2: true,
        });
        logTeamsData(page);
      } else {
        setStatusData("Something went wrong");
        setOpenModal({
          ...openModal,
          open2: true,
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };

  const handleFilter = async (e) => {
    const response = await fetch(
      `http://localhost:7000/buckbox-teams?ordering=${e.target.value}&page=${page}&limit=${limit}`
    );
    const TeamsData = await response.json();
    setTeamsData(TeamsData.data);
    if (TeamsData.data.length) {
      setTotalPages(TeamsData.totalPages);
    }
  };

  const handlePagination = (event, newPage) => {
    setPage(newPage);
    logTeamsData(newPage);
  };

  const checkError = (data) => {
    const tempErrors = { ...errors };
    const cloneData = { ...data };
    for (const key in cloneData) {
      const current = validation(key, data[key]);
      if (current?.length) {
        tempErrors[key] = current || [];
      } else {
        tempErrors[key] = [];
      }
    }
    if (Object.values(tempErrors).flat().length) {
      setErrors(tempErrors);
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="main-div">
      <div className="head-div">
        <h2>Buckbox Team Members List</h2>{" "}
        <div>
          <div>
            <select className="sort-select" onChange={handleFilter}>
              <option value={""}>Sort by name</option>
              <option value={"ascending"}>Ascending</option>
              <option value={"descending"}>Descending </option>
            </select>

            <input
              className="search-input"
              name="minAge"
              placeholder="Search with minimum age"
              value={minAge}
              onChange={handleSearchminAge}
            />
            <input
              className="search-input"
              name="maxAge"
              placeholder="Search with maximum age"
              value={maxAge}
              onChange={handleSearchMaxAge}
            />
            <input
              className="search-input"
              name="search"
              placeholder="Search with name & country"
              value={search}
              onChange={handleSearch}
            />

            <button onClick={handleAdd} className="add-btn">
              + Member
            </button>
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            {teamHeader.map((item, i) => (
              <th key={i}>{item}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teamsData.length ? (
            teamsData.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{(page - 1) * limit + (i + 1)}</td>
                  <td>{item._id}</td>
                  <td>
                    <img src={item.profileImg} alt={""} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td>{item.country}</td>
                  <td>
                    <button
                      style={{ background: "#083dd3" }}
                      onClick={() => {
                        handleEdit(item._id);
                        setId(item._id);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleView(item._id)}>View</button>
                    <button
                      style={{ background: "#dd0707" }}
                      onClick={() => {
                        setOpenModal({
                          ...openModal,
                          open3: true,
                        });
                        setId(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <p>Data Not Found</p>
          )}
        </tbody>
      </table>
      <DetailBox {...{ openModal, handleClose, teamsInfo }} />
      <AddMember
        {...{
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
        }}
      />
      <StatusModal {...{ openModal, handleClose, statusData }} />
      <DeleteBox {...{ openModal, handleClose, handleDelete }} />

      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePagination}
        />
      </Stack>
    </div>
  );
}
