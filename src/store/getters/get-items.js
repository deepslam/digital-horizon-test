export default (state) => parent => {
    if (
        typeof state.items[parent] != "undefined" &&
        Array.isArray(state.items[parent])
    ) {
        return state.items[parent];
    } else {
        return [];
    }
}