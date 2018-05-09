import {URL} from './url'
import Data from '../disciplines.json';
import oneData from '../oneDiscipline.json';
import sillabus from '../sillabus.json';

export async function load() {
    console.log("Api disciplines running...");
    const data  = Data;
    let augmentedData = [];
    let j = 0;
    for (let i =0; i < data.length; i++) {
        item = data[i];
        // let url=`http://almaunion.almau.edu.kz/disciplines/${item.subjectid}/info/teacher`
        // load one discipline:
        materials = [];
        let oneDisc = oneData;
        const re = /<span>Описание<\/span>:<\/b>\s*([^<.]*)\s*<\/div>/i;
        const re1 = /href="http:\/\/almaunion.almau.edu.kz\/database\/download\/(\d+)"/i;
        for (let key in oneData.items) {
            for (let i1 = 0; i1 < oneData.items[key].length; i1++) {
                j++;
                let htmlUrl = `http://almaunion.almau.edu.kz/database/view/${key}/${oneData.items[key][i1].id}`;
                //console.log("Downloading",htmlUrl);
                //downloading this
                let response = sillabus.text;
                let descriptionFound = response.match(re);
                let description = "Без описания";
                if (descriptionFound !== null)
                    description = descriptionFound[1];
                let found = response.match(re1);
                if (found !== null) {
                    let fileId = found[1];
                    materials.push({"description": description, "filename": found[0], "fileId": found[1], "id": "file"+j})
                }
            }
        }
        item.files=materials;
        augmentedData.push(item);
    }
    return augmentedData;
}
