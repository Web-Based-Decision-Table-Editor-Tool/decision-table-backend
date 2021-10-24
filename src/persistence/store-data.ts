import fs from 'fs';

const storeData = (data: any, path: string) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}

export default storeData;
