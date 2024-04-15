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
        fontFamily={"vazir"}
      >
        <Text textAlign={"center"} py={"16px"} px={"7px"}>
          <a target="_blank" href="https://ussistant.ir/">
            خانه
          </a>
        </Text>
        {/* <Text textAlign={"center"} py={"16px"} px={"7px"} onMouseEnter={}>
          <a target="_blank" href="#">محصولات</a>
        </Text> */}
        <Text textAlign={"center"} py={"16px"} px={"7px"}>
          <a target="_blank" href="https://ussistant.ir/about">
            {" "}
            درباره ما
          </a>
        </Text>

        <Text textAlign={"center"} py={"16px"} px={"7px"}>
          <a href="#call">تماس با ما</a>
        </Text>
      </Box>
      <Box bgColor={"#020512"} width={"100%"} boxShadow={"0px 6px white"}>
        <Box
          fontFamily={"vazir"}
          display={"flex"}
          flexFlow={"row"}
          justifyContent={{ base: "space-between", md: "end" }}
          color={"white"}
          p={"1rem"}
          gap={"10px"}
          maxW={"2000px"}
          mx={"auto"}
        >
          <Box rowGap={"1rem"} display={"flex"} flexFlow={"row-reverse"}>
            {isMobile ? (
              <Box transform={"scale(2)"} onClick={() => setModal((p) => !p)}>
                <FiMenu />
              </Box>
            ) : (
              <>
                <Text
                  textAlign={"center"}
                  _hover={{ color: "white" }}
                  fontSize={"18px"}
                  fontFamily={"vazir"}
                  fontWeight={"bold"}
                  py={"10px"}
                  px={"7px"}
                  color={"rgba(226, 223, 223, 0.60)"}
                >
                  <a target="_blank" href="https://ussistant.ir/">
                    خانه
                  </a>
                </Text>
                {/* <Text textAlign={"center"}
              _hover={{color:"white"}} fontSize={"18px"}
              fontFamily={"vazir"}
              fontWeight={"bold"} py={"10px"} px={"7px"} onMouseEnter={}>
          <a target="_blank" href="#">محصولات</a>
        </Text> */}
                <Text
                  textAlign={"center"}
                  color={"rgba(226, 223, 223, 0.60)"}
                  _hover={{ color: "white" }}
                  fontSize={"18px"}
                  fontFamily={"vazir"}
                  fontWeight={"bold"}
                  py={"10px"}
                  px={"7px"}
                >
                  <a target="_blank" href="https://ussistant.ir/about">
                    {" "}
                    درباره ما
                  </a>
                </Text>

                <Text
                  textAlign={"center"}
                  color={"rgba(226, 223, 223, 0.60)"}
                  _hover={{ color: "white" }}
                  fontSize={"18px"}
                  fontFamily={"vazir"}
                  fontWeight={"bold"}
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
                paddingBottom: "5px",
              }}
              src="/ussis.svg"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
