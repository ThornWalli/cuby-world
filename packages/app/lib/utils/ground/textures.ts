export interface GroundTexture {
  id: string;
  name: string;
  description?: string;
  color: {
    small: string;
    medium: string;
  };
  normal?: {
    small: string;
    medium: string;
  };
  ambient?: {
    small: string;
    medium: string;
  };
  displacement?: {
    small: string;
    medium: string;
  };
  specular?: {
    small: string;
    medium: string;
  };
}
