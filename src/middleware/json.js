export const json = async (req, res) => {
  const buffer = [];

  for await (const chunk of req) {
    buffer.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffer).toString());
  } catch {
    req.body = null;
  }
  return res.setHeader("Content-type", "application/json");
};
