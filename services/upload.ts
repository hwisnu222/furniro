import { API_BASE } from "@/config/api";
import { routes } from "./routes";

/**
 *
 * @param formData Form Data
 * @return idMedia {number}
 */

export const uploadMedia = async (formData: any) => {
  let idMedia: number | undefined = 0;
  try {
    const upload = await API_BASE.post(routes.UPLOAD, formData, {
      headers: { "Content-Type": "multipart:form-data" },
    });
    idMedia = upload.data[0].id;
  } catch (error) {
    idMedia = undefined;
  }
  return idMedia;
};
