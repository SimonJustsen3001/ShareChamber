import { Layout } from "../interfaces/layoutInterface";
import Helmet, { HelmetProvider } from "react-helmet-async";

export default function Layout({ children, title, description }: Layout) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <div>{children}</div>
    </>
  );
}
