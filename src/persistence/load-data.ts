import fs from 'fs';

const loadData = (path: string): any => {
    try {
        return fs.readFileSync(path, 'utf8')
    } catch (err) {
        console.error(err)
        return false
    }
}

export default loadData;
