import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  Img,
  Button,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { FiMenu } from "react-icons/fi/index.js";
import { useIsMobile } from "../../hooks";

export const Header = () => {
  const [modal, setModal] = React.useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <Box
        hidden={modal ? false : true}
        width={"100%"}
        bgColor={"#020512"}
        pos={"absolute"}
        top={"51px"}
        zIndex={"22222"}
        left={"0"}
        color={"white"}
        p={"2rem"}
        fontFamily={"yekan"}
      >
        <Text textAlign={"center"} py={"16px"} px={"7px"}>
          <a href="https://ussistant.ir/">خانه</a>
        </Text>
        {/* <Text textAlign={"center"} py={"16px"} px={"7px"} onMouseEnter={}>
          <a href="#">محصولات</a>
        </Text> */}
        <Text textAlign={"center"} py={"16px"} px={"7px"}>
          <a href="https://ussistant.ir/about"> درباره ما</a>
        </Text>

        <Text textAlign={"center"} py={"16px"} px={"7px"}>
          <a href="#call">تماس با ما</a>
        </Text>
      </Box>
      <Box
        borderBottom={"1px solid #ffffff1f"}
        fontFamily={"yekan"}
        display={"flex"}
        flexFlow={"row"}
        justifyContent={"space-between"}
        color={"white"}
        bgColor={"#020512"}
        width={"100%"}
        p={"1rem"}
        boxShadow={"0px 6px white"}
      >
        <Box rowGap={"1rem"} display={"flex"} flexFlow={"row"}>
          {isMobile ? (
            <Box transform={"scale(2)"} onClick={() => setModal((p) => !p)}>
              <FiMenu />
            </Box>
          ) : (
            <>
              <Text
                textAlign={"center"}
                _hover={{ color: "#ffffd5" }}
                fontSize={"18px"}
                py={"10px"}
                px={"7px"}
              >
                <a href="https://ussistant.ir/">خانه</a>
              </Text>
              {/* <Text textAlign={"center"}
              _hover={{color:"#ffffd5"}} fontSize={"18px"} py={"10px"} px={"7px"} onMouseEnter={}>
          <a href="#">محصولات</a>
        </Text> */}
              <Text
                textAlign={"center"}
                _hover={{ color: "#ffffd5" }}
                fontSize={"18px"}
                py={"10px"}
                px={"7px"}
              >
                <a href="https://ussistant.ir/about"> درباره ما</a>
              </Text>

              <Text
                textAlign={"center"}
                _hover={{ color: "#ffffd5" }}
                fontSize={"18px"}
                py={"10px"}
                px={"7px"}
              >
                <a href="#call">تماس با ما</a>
              </Text>
            </>
          )}
        </Box>
        <Box display={"flex"}>
          <Img
            mx={"auto"}
            style={{
              width: "7rem",
            }}
            src="/ussis.svg"
          />
        </Box>
      </Box>
    </>
  );
};
