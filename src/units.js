export const fillterAllSpace = (str = '') => {
  if (!str) return ''
  const newStr = str?.replace(/ /g, "")
  return newStr
}