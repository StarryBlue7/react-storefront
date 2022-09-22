const {v4: uuid} = require("uuid");

/**
 * Generate a unique order id with prepended date & time
 * @returns {String} Unique order id with prepended date & time
 */
export default function newOrderId() {
  const now = new Date().toISOString();
  // Prepend creation date as YYYY-MM-DD
  const date = now.substring(0, 10);
  // Time as HHMM
  const time = now.substring(11, 13) + now.substring(14, 16);
  // Append unique identifier
  const uniqueId = uuid();

  return `${date}-${time}-${uniqueId}`;
}
