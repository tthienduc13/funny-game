export function isValidInput(name1: string, name2: string): boolean {
  const regex = /^[A-Za-z0-9 ]+$/;
  if (!regex.test(name1) || !regex.test(name2)) {
    // check if either name contains invalid characters
    return false;
  }
  if (/^[0-9]/.test(name1) || /^[0-9]/.test(name2)) {
    // check if either name starts with a number
    return false;
  }
  if (name1 === name2) {
    // check if name1 is the same as name2
    return false;
  }
  return true;
}
