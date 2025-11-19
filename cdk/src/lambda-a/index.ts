export const handler = async () => {
  const secret = "HARDCODED_TOKEN_LAMBDA_A_123";
  console.log("Lambda A running", secret);
  return { ok: true };
};
