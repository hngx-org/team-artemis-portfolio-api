import { Request, Response } from 'express';
import { Project } from '../database/entity/model'; // Import your Project model
import { connectionSource } from "../database/data-source";


// Define the controller method for deleting a project section
const deleteProjectSection = async (req: Request, res: Response) => {
  const projectId = req.params.id;

  try {
    // Find the project by ID
    const projectRepository = connectionSource.getRepository(Project);
    const project = await projectRepository.findOne({ where: { id: parseInt(projectId) } });

    // Check if the project exists
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const deletedProjectInfo = { ...project };
    // Perform the deletion
    await projectRepository.remove(project);

    return res.status(204).json({ message: 'Project deleted successfully', deletedProjectInfo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default {
  deleteProjectSection,
};
