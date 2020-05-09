import noop from './noop';

/**
 * 树形结构的数据处理
 */

/**
 * 递归树结构的节点
 * @param {Array} treeData 树形结构数据
 * @param {String} childrenName 子集的字段名，例如：children
 * @param {Function} callback 回调函数，返回树结构的节点
 * @param {Object} parent 父级，默认 null
 */
export function recursiveTreeNode(
  treeData,
  childrenName = 'children',
  callback = noop,
  parent = null
) {
  treeData.forEach((item) => {
    callback(item);
    item.parent = parent;
    let children = item[childrenName];
    if (children && children.length) {
      recursiveTreeNode(children, childrenName, callback, item);
    }
  });
}

/**
 * 树形结构的处理
 * @param {Array} treeData 树形结构数据
 * @param {String} childrenName 子集的字段名，例如：children
 */
export function createParentRef(treeData, childrenName = 'children') {
  recursiveTreeNode(treeData, childrenName);
}

/**
 * 递归树结构的节点集合（children 数组，非节点）
 * @param {Array} treeData 树形结构数据
 * @param {String} childrenName 子集的字段名，例如：children
 * @param {Function} callback 回调函数，返回树结构的节点集合（children 数组，非节点）
 * @param {Object} parent 父级，默认 null
 */
export function recursiveTreeChildren(
  treeData,
  childrenName = 'children',
  callback = noop,
  parent = null
) {
  callback(treeData);

  treeData.forEach((item) => {
    item.parent = parent;
    let children = item[childrenName];
    if (children && children.length) {
      recursiveTreeChildren(children, childrenName, callback, item);
    }
  });
}

/**
 * 转换树形结构为平级结构
 * @param {Array} treeData 树形结构数据
 * @param {String} childrenName 子集的字段名，例如：children
 *
 * @return {Array}
 */
export function transferToFlatTree(treeData, childrenName = 'children') {
  const result = [];
  recursiveTreeNode(treeData, childrenName, (item) => result.push(item));
  return result;
}
