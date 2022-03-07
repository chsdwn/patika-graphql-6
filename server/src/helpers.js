const createMutation = (arr, data) => {
  const user = { id: arr.length + 1, ...data }
  arr.push(user)
  return user
}
const updateMutation = (arr, id, data) => {
  const index = arr.findIndex((u) => u.id === Number(id))
  if (index === -1) throw new Error('Not found')

  const updatedUser = (arr[index] = { ...arr[index], ...data })
  return updatedUser
}
const deleteMutation = (arr, id) => {
  const index = arr.findIndex((u) => u.id === Number(id))
  if (index === -1) throw new Error('Not found')

  const deletedUser = arr.splice(index, 1)[0]
  return deletedUser
}
const deleteAllMutation = (arr) => {
  const count = arr.length
  arr.splice(0, count)
  return { count }
}

module.exports = {
  createMutation,
  updateMutation,
  deleteMutation,
  deleteAllMutation
}
