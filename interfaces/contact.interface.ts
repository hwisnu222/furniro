export interface ContactItem {
  id: number;
  attributes: {
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
    updatedAt: string;
  };
}
