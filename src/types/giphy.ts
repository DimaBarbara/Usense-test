export interface GifImage {
  url: string;
  width: string;
  height: string;
}

export interface GiphyData {
  id: string;
  title: string;
  username: string;
  import_datetime: string;
  images: {
    original: GifImage;
    fixed_height: GifImage;
  };
}

export interface GiphyResponse {
  data: GiphyData[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
}