import data from '../../data/data.json';
import * as StoreConst from '../../constants/vuex';

export default () => {
    return new Promise((resolve, reject) => {
        const result = {};

        data.forEach(i => {
            const newObject = {
                ...i
            };
            newObject.selected = false;
            if (typeof result[newObject.parentId] == "undefined") {
                result[newObject.parentId] = [];
            }
            result[newObject.parentId].push(newObject);
        });

        resolve(result);
    });
}