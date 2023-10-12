import { Request, Response } from 'express';
import { connectionSource as dataSource } from '../database/data-source';
import { Award} from '../database/entity/model';

const createAwardsController = () => {

}


// Get award by Id
 const getAwardController = async (req: Request, res: Response) => {
    const awardRepo = dataSource.getRepository(Award)
    
    try {
        const id = parseInt(req.params.id)
        const award = await awardRepo.findOne({ 
            where:{ id} });
        if (!award) {
            return res.status(404).json({message: 'Award not found'});
        }
        res.status(200).json({
            message: 'Award created successfully',
            award
        })
    } catch (error) {
        console.error('Error getting award', error);
        res.status(500).json({message: 'Internal server error'})
    }
    
};
    //Delete award by id
 const deleteAwardController = async (req: Request, res: Response) => {
    const awardRepo = dataSource.getRepository(Award)
    
    try {
        const id = parseInt(req.params.id)
        const award = await awardRepo.findOne({ 
            where:{ id} });
        if (!award) {
            return res.status(404).json({message: 'Award not found'});
        }
        res.status(200).json({
            message: 'Award deleted successfully',
            award
        })
    } catch (error) {
        console.error('Error deleting award', error);
        res.status(500).json({message: 'Internal server error'})
    }
    
};
    export { createAwardsController,
            getAwardController,
            deleteAwardController
           }