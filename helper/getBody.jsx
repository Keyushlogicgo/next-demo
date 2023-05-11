export const getBody = async (body) => {
  const chunks = [];
  const decoder = new TextDecoder();
  const reader = body.getReader();
  let done, value;

  while (!done) {
    ({ done, value } = await reader.read());
    if (value) {
      chunks.push(decoder.decode(value));
    }
  }

  return JSON.parse(chunks.join(""));
};
