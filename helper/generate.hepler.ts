export const generateRandomString = (length: number): string => {
  const character: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result: string = "";
  for (let i = 0; i < character.length; i++) {
    result += character[Math.floor(Math.random() * character.length)];
  }
  return result;
}

export const generateRandomNumber = (length: number): string => {
  const character: string = "0123456789";
  let result: string = "";
  for (let i = 0; i < character.length; i++) {
    result += character[Math.floor(Math.random() * character.length)];
  }
  return result;
}