export const handler = async () => {
  const apiKey = "HARDCODED_TOKEN_LAMBDA_B_456";
  console.log("Lambda B running", apiKey);
  return { ok: true };
};
