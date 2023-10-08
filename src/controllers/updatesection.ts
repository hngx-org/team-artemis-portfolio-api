import express, { Request, Response } from 'express';
import { Section, CustomField } from '../database/entity/model';
import { connectionSource } from "../database/data-source"; // Import connectionSource

const updateCustomSection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, customFields } = req.body;

    // Get the database connection from the connectionSource
    const connection = await connectionSource.getConnection();

    // Get the repositories using the connection
    const sectionRepository = connection.getRepository(Section);
    const customFieldRepository = connection.getRepository(CustomField);

    // Find the custom section by ID with associated custom fields
    const customSection = await sectionRepository.findOne(id, { relations: ['customFields'] });

    if (!customSection) {
      return res.status(404).json({ message: 'Custom section not found' });
    }

    // Update properties of the custom section
    if (name) {
      customSection.name = name;
    }

    // Update custom fields if provided in the request body
    if (customFields) {
      await Promise.all(customFields.map(async (fieldData) => {
        const { id: fieldId, value } = fieldData;
        const customField = customSection.customFields.find((field) => field.id === fieldId);

        if (customField) {
          customField.value = value;
          await customFieldRepository.save(customField);
        }
      }));
    }

    // Save the updated custom section
    await sectionRepository.save(customSection);

    // Release the connection
    await connection.release();

    return res.status(200).json({
      message: 'Custom section and associated custom fields updated successfully',
      customSection,
    });
  } catch (error) {
    console.error('Error updating custom section:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default updateCustomSection;
