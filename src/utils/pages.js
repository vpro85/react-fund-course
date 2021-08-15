export const getPageCount = (totalCount, limit) => {
    const count = Math.ceil(totalCount / limit)
    return count
}