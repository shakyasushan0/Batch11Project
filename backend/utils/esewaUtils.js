import crypto from "crypto";

export const generateSignature = (message) => {
  console.log(message);
  const ESEWA_KEY = "8gBm/:&EnhH.1/q";
  const hmac = crypto.createHmac("sha256", ESEWA_KEY);
  hmac.update(message);

  const base64sign = hmac.digest("base64");

  return base64sign;
};

// http://localhost:3000/api/order/confirm-payment?data=eyJ0cmFuc2FjdGlvbl9jb2RlIjoiMDAwREJLTCIsInN0YXR1cyI6IkNPTVBMRVRFIiwidG90YWxfYW1vdW50IjoiMzk5Ljk5IiwidHJhbnNhY3Rpb25fdXVpZCI6IjY5NDBlZTZiZjVhNTU2YzAyNTExMWYxYyIsInByb2R1Y3RfY29kZSI6IkVQQVlURVNUIiwic2lnbmVkX2ZpZWxkX25hbWVzIjoidHJhbnNhY3Rpb25fY29kZSxzdGF0dXMsdG90YWxfYW1vdW50LHRyYW5zYWN0aW9uX3V1aWQscHJvZHVjdF9jb2RlLHNpZ25lZF9maWVsZF9uYW1lcyIsInNpZ25hdHVyZSI6Ii9nTXNzckxVVDUrUXZ6VURpMzZNaWs4NTVka1ZTVkV3eFFhaTFrcERoZ009In0=
