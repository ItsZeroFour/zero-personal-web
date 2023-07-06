import projectModel from "../models/Project.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await projectModel.find().sort({stars: -1});
    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get projects",
    });
  }
};
export const getOneProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    projectModel
      .findOneAndUpdate(
        {
          _id: projectId,
        },
        {
          returnDocument: "after",
        }
      )
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Failed to get project" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get project",
    });
  }
};
export const increaseStarOfProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    await projectModel.findByIdAndUpdate(
      projectId,
      {
        $push: { stars: req.userId },
      },
      {
        new: true,
      }
    );

    res.json({
      message: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to increase stars",
    });
  }
};
export const unincreaseStarOfProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    await projectModel.findByIdAndUpdate(
      projectId,
      {
        $pull: { stars: req.userId },
      },
      {
        new: true,
      }
    );

    res.json({
      message: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to increase stars",
    });
  }
};
export const createProject = async (req, res) => {
  try {
    const doc = new projectModel({
      title: req.body.title,
      text: req.body.text,
      githubRepoLink: req.body.githubRepoLink,
      stacks: req.body.stacks,
    });

    const project = await doc.save();

    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create project",
    });
  }
};
export const removeProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    projectModel
      .findOneAndDelete({
        _id: projectId,
      })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Project not found",
          });
        }

        res.json({
          message: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Can't remove project",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to remove project",
    });
  }
};
export const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    await projectModel.findOneAndUpdate(
      {
        _id: projectId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        githubRepoLink: req.body.githubRepoLink,
        stacks: req.body.stacks,
      }
    );

    res.json({
      message: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to update project",
    });
  }
};
