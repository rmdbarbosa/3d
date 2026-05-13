export type AdminMessageVariant = "success" | "error";

export type AdminMessage = {
  text: string;
  variant: AdminMessageVariant;
};
