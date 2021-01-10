export function normalizeRecordsById(records) {
  return records.reduce((normalizedHash, record) => {
    normalizedHash[record.id] = record
    return normalizedHash
  }, {})
}

export function immutableAppendOrUpdate(records, record) {
  return { ...records, [record.id]: record }
}
