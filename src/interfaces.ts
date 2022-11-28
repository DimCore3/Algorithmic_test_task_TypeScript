interface MainInterface {
    id: number | string,
    parent: number | string,
    children?:Node[],
    type?: any,
};

class Node {
    id: string | number;
    parent:Node | null;
    children:Node[] = [];

    constructor(item:MainInterface, parent:Node | null) {
        this.id = String(item.id);
        this.parent = parent;
        if (this.parent) {
            this.parent.children.push(this);
        }
    };

    getParents(): Node[] | [] {
        if (this.parent) {
            return [this.parent, ...this.parent.getParents()]
        }
        return []
    };

    getChildren(): Node[] | [] {
        let result = this.children;
        if (this.children.length > 0) {
            for (let child of this.children) {
                result.push(...child.getChildren());
            }
        }
        return result
    }
}

class TreeStore {
    fullItemsList:MainInterface[] = [];
    itemsMapCollection = new Map;

    constructor(items:MainInterface[]) {
        this.fullItemsList = items;
        items = items.sort(el => Number(el.id))
        items.forEach(item => {
            item.id = String(item.id);
            item.parent = String(item.parent);
            let nodeElement = new Node(item, this.itemsMapCollection.get(item.parent));
            this.itemsMapCollection.set(item.id, nodeElement);
        });
    };

    getAll() {
        try {
            return this.fullItemsList;
        } catch (error) {
            console.log('Ошибка: ', error)
        }
    };

    getItem (id: number | string) {
        try {
            return this.itemsMapCollection.get(String(id));

        } catch ( error ) {
            console.log('Ошибка: ', error);
        }
    };

    getChildren(id: number | string) {
        try {
            let element = this.getItem(id);
            return element.children;

        } catch (error) {
            console.log('Что-то пошло не так: ', error)
        }
    };

    getAllChildren(id: number | string) {
        let element = this.getItem(id);
        return element.getChildren()
    };

    getAllParents(id: number | string) {
        let element = this.getItem(id);
        return element.getParents()
    }
};

const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 6, parent: 2, type: 'test' },
    { id: 7, parent: 4, type: null },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items)
export default ts
