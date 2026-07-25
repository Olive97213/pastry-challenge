export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: {
    field: string;
    message: string;
  }[];
};