import { GetServerSideProps } from "next";
import { Axios } from "services/axios";

export const withAuth = (): GetServerSideProps => {
  return async ({ req }) => {
    try {
      await Axios.get("/api/auth", {
        headers: { cookie: req.headers.cookie! },
      });
      return {
        props: {},
      };
    } catch (error: any) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
        props: {},
      };
    }
  };
};
