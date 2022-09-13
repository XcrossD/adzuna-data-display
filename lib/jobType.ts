import { Category } from "../types/data";
import { getCategoriesData } from "./api";

export async function getAllJobTypeIds() {
  const categoriesData: Category[] = await getCategoriesData();
  return categoriesData.map((elem) => {
    return {
      params: {
        id: elem.tag,
      },
    };
  });
}