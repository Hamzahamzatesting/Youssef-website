import imageCompression from "browser-image-compression";

const COMPRESSION_OPTIONS = {
  maxWidthOrHeight: 2560,
  initialQuality: 0.82,
  useWebWorker: true,
  fileType: "image/webp" as const,
};

const COMPRESSION_THRESHOLD_BYTES = 300 * 1024;

export async function compressIfNeeded(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.size <= COMPRESSION_THRESHOLD_BYTES) {
    return file;
  }
  try {
    const compressed = await imageCompression(file, COMPRESSION_OPTIONS);
    const newName = file.name.replace(/\.[^.]+$/, "") + ".webp";
    return new File([compressed], newName, { type: "image/webp" });
  } catch (err) {
    console.warn("Image compression failed, uploading original file:", err);
    return file;
  }
}

export function readVideoMetadata(
  file: File
): Promise<{ width: number | null; height: number | null; duration: number | null }> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    const url = URL.createObjectURL(file);
    video.src = url;
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: video.videoWidth || null,
        height: video.videoHeight || null,
        duration: Number.isFinite(video.duration) ? video.duration : null,
      });
    };
    video.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ width: null, height: null, duration: null });
    };
  });
}

export function readImageDimensions(
  file: File
): Promise<{ width: number | null; height: number | null }> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth || null, height: img.naturalHeight || null });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ width: null, height: null });
    };
  });
}
