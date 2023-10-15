import { connectionSource } from '../database/data-source'
import { Award } from '../database/entities'
import { AwardData } from '../interfaces/'

// Service function to create an award
export const createAwardService = async (award: AwardData) => {
  try {
    const awardRepository = connectionSource.getRepository(Award)
    const createdAward = await awardRepository.save(award)
    return createdAward
  } catch (error) {
    throw new Error('Error creating award')
  }
}
