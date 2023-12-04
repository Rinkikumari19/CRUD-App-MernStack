var express = require("express");
const router = express.Router();
const { validateUserData } = require(".././validations/validation");
const Team = require("../models/users");

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
});
router.use("/profile", express.static("upload/images"));

// GET API
router.get("/", async (req, res) => {
  const teams = await Team.find();

  teamsData = teams;

  req.query.search
    ? (teamsData = teamsData.filter(
        (item) =>
          item.name.toLowerCase().includes(req.query.search.toLowerCase()) ||
          item.country.toLowerCase().includes(req.query.search.toLowerCase())
      ))
    : teamsData;

  // search with specific age
  req.query.age
    ? (teamsData = teamsData.filter((item) => item.age == req.query.age))
    : teamsData;

  //Minimum age filter
  req.query.minAge
    ? (teamsData = teamsData.filter((item) => item.age >= req.query.minAge))
    : teamsData;

  //Maximum age filter
  req.query.maxAge
    ? (teamsData = teamsData.filter((item) => item.age <= req.query.maxAge))
    : teamsData;

  // Ordering with name
  if (req.query.ordering) {
    if (req.query.ordering === "ascending") {
      teamsData.sort((a, b) => {
        return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
      });
    } else if (req.query.ordering === "descending") {
      teamsData.sort((a, b) => {
        return b.name.localeCompare(a.name, undefined, { sensitivity: "base" });
      });
    }
  }

  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = teamsData.slice(startIndex, endIndex);

  if (teamsData.length) {
    res.json({
      data: paginatedData,
      page,
      pageSize,
      totalPages: Math.ceil(teamsData.length / pageSize),
    });
  } else {
    res.json({ data: [] });
  }
});

// GET API WITH ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const team = await Team.findById(id);

    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ error: "Team not found" });
    }
  } catch (error) {
    console.error("Error retrieving team:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//POST API FOR CREATE TEAM MEMBER
router.post("/", upload.single("profileImg"), (req, res) => {
  const validationErrors = validateUserData(req.body, req.file);
  if (Object.keys(validationErrors).length === 0) {
    const newMember = {
      ...req.body,
      profileImg: `http://localhost:7000/buckbox-teams/profile/${req.file.filename}`,
    };

    const newMemberPromise = new Team(newMember);
    newMemberPromise
      .save()
      .then((data) => console.log("datadata: ", data))
      .catch((error) => console.log(error));

    res.status(200).json({ message: "Data successfully added" });
  } else {
    res.status(400).json({ errors: validationErrors });
  }
});

//PUT API FOR UPDATE THE DATA
router.put("/:id", upload.single("profileImg"), async (req, res) => {
  const { id } = req.params;

  const validationErrors = validateUserData(req.body, req.file);
  if (Object.keys(validationErrors).length === 0) {
    let updateData = {};
    if (req.file) {
      updateData = {
        ...req.body,
        profileImg: `http://localhost:7000/buckbox-teams/profile/${req.file.filename}`,
      };
    } else {
      updateData = {
        ...req.body,
      };
    }

    const updatedTeam = await Team.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json({ message: "Data successfully updated" });
  } else {
    res.status(400).json({ errors: validationErrors });
  }
});

//DELETE API FOR DELETE THE USER
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTeam = await Team.findOneAndDelete({ _id: id });

    if (deletedTeam) {
      res.json({ message: "Team deleted successfully" });
    } else {
      res.status(404).json({ error: "Team not found" });
    }
  } catch (error) {
    console.error("Error deleting team:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
