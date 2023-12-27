import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res) => {
  try {
    const userid = req.user.id;
    const tasks = await Task.find({ user: userid });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res) => {
  //   const { id } = req.params; same as below

  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("Task Not found", 404));
    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Task Not found", 404));
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    next(error);
  }
};
