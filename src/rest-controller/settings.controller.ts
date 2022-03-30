import { Service } from 'typedi';
import { Request, Response } from "express";
import settingsService from '../service/settings.service';

@Service()
export class settingsController {

    // passing dependencies
    constructor(private settingsService: settingsService) {
    }

    public setMaxTables = async (req: Request, res: Response): Promise<void> => {
        try{
            const maxTables = req.params.maxTables;
            const response  = await this.settingsService.setMaxTables(parseInt(maxTables))
            res.status(200).json(response);
        } catch(error){
            // logging caught error
            console.log(error);

            // sending error as response and error status
            res.status(404).send(error);
        }
    }

    

}
