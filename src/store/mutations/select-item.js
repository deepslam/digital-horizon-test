import _ from 'lodash';

export default (state, val) => {
    let selected = state.selected;
    let newSelected = {};
    let items = state.items;
    _.map(selected, i => {
       if (i.level >= val.level) {
           items[i.parentId].map(subItem => {
               if (subItem.id == i.id) {
                   subItem.selected = false;
               }
           });
           i = undefined;
       } else {
           newSelected[i.level] = i;
       }
    });
    newSelected[val.level] = val;
    if (typeof items[val.parentId] != "undefined") {
        items[val.parentId].map(i => {
           if (i.id == val.id) {
               i.selected = true;
           }
        });
    }
    state.selected = Object.assign({}, newSelected);
    state.items = Object.assign({}, items);
}