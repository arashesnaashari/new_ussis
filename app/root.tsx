import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { HStack, ChakraProvider } from "@chakra-ui/react";
import styles from "~/../public/style.css";
import PinarStyle from "~/assets/pinar.css";

export let links: LinksFunction = () => {
  return [
    cssBundleHref
      ? { rel: "stylesheet", href: cssBundleHref }
      : { rel: "stylesheet", href: "" },
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: PinarStyle },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
    },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ChakraProvider>
          <HStack
            bg={"white"}
            alignItems={"center"}
            width={"100%"}
            justifyContent={"start"}
            shadow={"sm"}
          >
            <img
              style={{
                paddingLeft: "1rem",
                width: "140px",
                marginBottom: "-2.5rem",
                marginTop: "-2.5rem",
              }}
              src="/ussis.png"
            />
          </HStack>
          <Outlet />
        </ChakraProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
