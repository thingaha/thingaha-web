export default function updateObjectInArray(array, updateItem, condition) {
  return array.map((item, index) => {
    if (!condition(item, updateItem)) {
      // This isn't the item we care about - keep it as-is
      return item
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...updateItem,
    }
  })
}
