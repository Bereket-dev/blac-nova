"use client";

type SignResponse = {
  timestamp: number;
  folder: string;
  signature: string;
  cloudName: string;
  apiKey: string;
};

export async function uploadProjectImage(
  file: File,
  idToken: string,
): Promise<{ url: string; publicId: string }> {
  const signRes = await fetch("/api/cloudinary/sign", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!signRes.ok) {
    const message = await signRes.text();
    throw new Error(message || "Failed to sign Cloudinary upload");
  }

  const sign = (await signRes.json()) as SignResponse;
  const form = new FormData();
  form.append("file", file);
  form.append("api_key", sign.apiKey);
  form.append("timestamp", String(sign.timestamp));
  form.append("signature", sign.signature);
  form.append("folder", sign.folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`,
    { method: "POST", body: form },
  );

  if (!uploadRes.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const payload = (await uploadRes.json()) as {
    secure_url: string;
    public_id: string;
  };

  return { url: payload.secure_url, publicId: payload.public_id };
}
