import * as VideoThumbnails from "expo-video-thumbnails";

export async function extractPoster(videoUri: string): Promise<string> {
  const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, { time: 0, quality: 0.8 });
  return uri;
}
