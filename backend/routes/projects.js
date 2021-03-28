const express = require("express");
const router = express.Router();
const opDB = require("../db/OpTaskDB");
router.get("/:id", async (req, res, next) => {
  const projectArray = await opDB.getUserProjects(req.params.id);
  if (projectArray) {
    res.send(projectArray);
  }
});

router.get("/projectData/:id", async (req, res, next) => {
  const projectData = await opDB.getProject(req.params.id);
  if (projectData) {
    res.send(projectData);
  }
});

router.post("/", async (req, res, next) => {
  const postResult = await opDB.createProject(req.body);
  if (postResult) {
    res.send(postResult);
  }
});

router.post("/newtask", async (req, res, next) => {
  const newTaskResult = await opDB.createTask(req.body);
  if (newTaskResult) {
    res.send(newTaskResult);
  }
});

router.get("/:id/tasks", async (req, res, next) => {
  const projectTasks = await opDB.getTasks(req.params.id);
  if (projectTasks) {
    res.send(projectTasks);
  }
});

router.post("/updatetask", async (req, res, next) => {
  const newTaskTimelineObject = req.body;
  const result = await opDB.updateTaskTimelineState(newTaskTimelineObject);
  if (result) {
    res.send({ done: true });
  }
});
module.exports = router;
