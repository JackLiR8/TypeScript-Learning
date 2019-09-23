+(() => {

  interface OnTree {
    name: string;
    id: number;
    parent_id: number | string;
    children?: OnTree[];
  }

  const arr = [
    {name: '2-2-2', id: 12, parent_id: 7},
    {name: '1', id: 1, parent_id:''},
    {name: '1-1', id: 3, parent_id: 1},
    {name: '2-1', id: 5, parent_id: 2},
    {name: '2', id: 2, parent_id: ''},
    {name: '1-1-1', id: 6, parent_id: 3},
    {name: '2-2', id: 7, parent_id: 2},
    {name: '2-2-1', id: 8, parent_id: 7},
    {name: '1-1-1-1', id: 9, parent_id: 6},
    {name: '2-2-2-1', id: 10, parent_id: 12},
    {name: '2-2-3', id: 11, parent_id: 7}
  ];

  function toTree(data: OnTree[], parentId: number | string) {
    let tree: OnTree[] = [];

    for (const v of data) {
      if (v.parent_id === parentId) {
        const children = toTree(data, v.id)
        if (children.length) {
          v.children = children;
        }
        
        tree.push(v)
      }
    }

    return tree
  }

  console.log(toTree(arr, ''));
  
})()