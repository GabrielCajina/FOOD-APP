import { NextPage } from "next";
export type NextPageLayout<T = {}> = NextPage<T> & {
  Layout?: React.FC<{ children: React.ReactNode }>;
};
