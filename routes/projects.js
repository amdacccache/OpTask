const express = require("express");
const router = express.Router();
const opDB = require("../db/OpTaskDB");

// get all of the users projects
router.get("/:id", async (req, res) => {
  const projectArray = await opDB.getUserProjects(req.params.id);
  if (projectArray) {
    res.send(projectArray);
  }
});

//get a paginated amount of projects to return to the dashboard
router.get("/:id/page/:pagenumber", async (req, res) => {
  const projectArray = await opDB.getPageProjects(
    req.params.id,
    req.params.pagenumber
  );
  if (projectArray) {
    res.send(projectArray);
  }
});

router.get("/:id/count", async (req, res) => {
  const projectsCount = await opDB.getUserProjectCount(req.params.id);
  if (projectsCount) {
    res.send({ count: projectsCount });
  }
});

router.get("/projectData/:id", async (req, res) => {
  const projectData = await opDB.getProject(req.params.id);
  if (projectData) {
    res.send(projectData);
  }
});

router.post("/", async (req, res) => {
  const postResult = await opDB.createProject(req.body);
  if (postResult) {
    res.send(postResult);
  }
});

router.post("/newtask", async (req, res) => {
  const newTaskResult = await opDB.createTask(req.body);
  if (newTaskResult) {
    res.send(newTaskResult);
  }
});

router.get("/:id/tasks", async (req, res) => {
  const projectTasks = await opDB.getTasks(req.params.id);
  if (projectTasks) {
    res.send(projectTasks);
  }
});

router.post("/updatetask", async (req, res) => {
  const newTaskTimelineObject = req.body;
  const result = await opDB.updateTaskTimelineState(newTaskTimelineObject);
  if (result) {
    res.send({ done: true });
  }
});

router.post("/updatetasktext", async (req, res) => {
  console.log(req.body);
  const result = await opDB.updateTaskText(req.body);
  if (result) {
    res.send({ done: true });
  }
});

router.post("/deletetask", async (req, res) => {
  const taskId = req.body.taskId;
  const result = await opDB.deleteTask(taskId);
  if (result) {
    res.send(result);
  }
});
module.exports = router;
