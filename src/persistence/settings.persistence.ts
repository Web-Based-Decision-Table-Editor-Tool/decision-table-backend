import { Service } from 'typedi';
import fs, { PathOrFileDescriptor } from 'fs';
import { Settings } from '../types/settings';

@Service()
export default class settingsPersistence{
    path: PathOrFileDescriptor;
    defaultSettings: Settings;

    constructor(){
        this.path = './settings.json'
        
        this.defaultSettings  = {
            maxTables: 1000,
            maxRules: 100,
            maxConditions: 100,
            maxActions: 100
        }
        
        if(!fs.existsSync(this.path)){
            fs.writeFileSync(this.path, JSON.stringify(this.defaultSettings))
        }
    }

    public getSettings(): Settings {
        try {
            const settings : Settings =  JSON.parse(fs.readFileSync(this.path, 'utf8'));
            return settings
        } catch (err) {
            console.error(err)
            return {} //empty settings
        }
    }
    
    public saveSettings(settings: Settings): boolean {
        try {
            fs.writeFileSync(this.path, JSON.stringify(settings))
        } catch (err) {
            console.error(err)
            return false;
        }
        return true; // save success
    }
    
}
