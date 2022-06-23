import { Category } from "@prisma/client";
import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().notRequired(),
  price: yup.number().positive().required().typeError("Must be a valid price"),
  url: yup.string().url().notRequired(),
  category: yup.string().oneOf([...Object.values(Category)]),
});
