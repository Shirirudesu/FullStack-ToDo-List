import express from "express";
import * as taskController from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// CREATE
router.post("/", taskController.createTask);

// READ all user todos
router.get("/", taskController.getUserTasks);

// READ one
router.get("/:id", taskController.getTask);

// UPDATE
router.put("/:id", taskController.updateTask);

// DELETE
router.delete("/:id", taskController.deleteTask);
//Сколько роутов, столько и контроллеров

export default router;
