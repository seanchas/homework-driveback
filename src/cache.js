const createEntry = (timestamp, onDelete) => {
  return {
    timestamp,
    onDelete,
    count: 1,
    next: null,
    prev: null,
  }
}

export const createCache = threshold => {
  let head = null

  const add = (timestamp, onDelete) => {
    if (head === null) {
      // set initial entry
      const entry = createEntry(timestamp, onDelete)

      entry.next = entry.prev = entry

      head = entry
    } else if (head.timestamp === timestamp) {
      // increment head
      head.count += 1
    } else {
      // append to head
      const entry = createEntry(timestamp, onDelete)

      head.prev.next = entry
      entry.prev = head.prev

      head.prev = entry
      entry.next = head

      head = entry
    }

    cleanup()
  }

  const cleanup = () => {
    if (head === null) return

    let tail = head.prev

    // delete entries, starting from tail
    while (tail !== null && head.timestamp - tail.timestamp >= threshold) {
      const onDelete = tail.onDelete
      const count = tail.count
      const prev = tail.prev

      tail.prev = tail.last = null
      tail.onDelete = null

      if (tail === head) {
        tail = head = null
      } else {
        head.prev = prev
        prev.next = head
        tail = prev
      }

      onDelete(count)
    }
  }

  return {
    add,
  }
}
