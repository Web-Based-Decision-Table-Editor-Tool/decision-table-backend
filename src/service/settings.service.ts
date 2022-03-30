import { Service } from 'typedi';
import settingsPersistence from '../persistence/settings.persistence';

@Service()
export default class settingsService{
    
    constructor(private persistence : settingsPersistence){
    }

    public async setMaxTables(numTables : Number){
        let settings = this.persistence.getSettings()
        settings.maxTables = numTables
        const saved = this.persistence.saveSettings(settings)
        if(!saved){
            throw("Error updating settings!")
        }
        return numTables
    }

    public async getMaxTables(): Promise<Number> {
        const max = await this.persistence.getSettings().maxTables;
        return max;
    }
}
