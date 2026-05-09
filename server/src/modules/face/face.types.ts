export interface FaceGreetingResponse {
  recognizedUser: string | null;
  greeting: string;
  confidence: number;
}
