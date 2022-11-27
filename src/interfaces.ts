interface MainInterface {
    id: number | string,
    parent: number | string,
    children?:Node[],
    type?: any,
};

class Node {
    id: string | number;
    parent:Node | 'root';
    children:Node[] = [];

    constructor(item:MainInterface, parent:Node) {
        this.id = String(item.id);
        this.parent = parent ?? 'root';
    };
}

class TreeStore {
    fullItemsList:MainInterface[] = [];
    itemsMapCollection = new Map;

    constructor(items:MainInterface[]) {
        this.fullItemsList = items;
        
        items.forEach(item => {
            item.id = String(item.id);
            item.parent = String(item.parent);
            let nodeElement = new Node(item, this.itemsMapCollection.get(item.parent));

            if (nodeElement.parent != 'root') {
                nodeElement.parent.children.push(nodeElement);
            }
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
        let result:Node[] = [];
        try {
            let childElements = this.getChildren(id);
            for (let child of childElements) {
                if (child.children.length != 0) {
                    result.push(child);
                    
                    this.getAllChildren(child.id)?.map((element) => {
                        result.push(element);
                    });

                } else {
                    result.push(child);
                }
            }
            return result;

        } catch (error) {
            console.log('Ошибка: ', error);
        }
    };

    getAllParents(id: number | string) {
        let result:Node[] = [];
        try {
            let parentElement = this.getItem(id).parent;
            if (parentElement != 'root') {
                result.push(parentElement);
                this.getAllParents(parentElement.id)?.map((element) => {
                    result.push(element);
                });

            } else {
                result.push(parentElement);
            }
            return result;

        } catch (error) {
            console.log('Ошибка: ', error);
        }
    }
};

const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items)
export default ts
