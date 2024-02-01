export default function CreateMenuTree(elements, parent_id = 0) {
    let branch = [];
    for (var i = 0; i < elements.length; i++) {
        if (elements[i]["parent_id"] === parent_id) {
            let children = CreateMenuTree(elements, elements[i].id);
            if (children) {
                elements[i].children = children;
            }
            branch.push(elements[i]);
        }
    }
    return branch;
}
