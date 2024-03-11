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

export const Hero = () => (
  <Box
    fontFamily={"yekan"}
    bgColor={"#020515"}
    w={"100%"}
    display={"flex"}
    flexFlow={{ base: "column", md: "row" }}
    overflow={"hidden"}
    height={{ base: "600px", md: "600px" }}
  >
    <Box
      // overflow={{ base: "hidden", md: "inherit" }}
      display="flex"
      flexFlow="column"
      alignSelf="center"
      ml={{ base: "0rem", md: "10rem" }}
    >
      <Img
        overflowX={{ base: "hidden", md: "auto" }}
        mx={"auto"}
        width={"700px"}
        transform={{ base: "scale(2)", md: "scale(1.8)" }}
        height={{ base: "500px", md: "350px" }}
        src="/wave.svg"
      />
    </Box>
    <Box
      bgColor={{ base: "#000000b3", md: "transparent" }}
      // bgColor={"red"}
      transform={"scale(0.95)"}
      borderRadius={"md"}
      height={{ base: "600px", md: "600px" }}
      pos={{ base: "absolute", md: "initial" }}
      display={"flex"}
      flexFlow={"column"}
      alignItems={"self-end"}
      py={{ base: "5rem", md: "7rem" }}
      px={{ base: "1rem", md: "3rem" }}
      justifyContent={"space-evenly"}
    >
      <Heading
        textAlign={"end"}
        fontSize={{ base: "27px", md: "36px" }}
        fontFamily={"yekan"}
        color={"white"}
      >
        سرویس گفتار به متن یوسسیتنت
      </Heading>
      <Text
        fontSize={{ base: "16px", md: "20px" }}
        width={"75%"}
        textAlign={"right"}
        color={"rgba(226, 223, 223, 0.74)"}
      >
        یوسسیسنت که از متنوع ترین مجموعه صدا یوسسیسنت که از متنوع ترین مجموعه
        صداها در جهان آموزش دیده است، ها در جهان آموزش دیده است، استاندارد دقت
        را برای برنامه های ویدیویی و صوتی تعیین می کند.
      </Text>
      <Box>
        <a href="#test">
          {" "}
          <Button
            bgColor={"#1B1A55"}
            border={"1px solid #1B1A55"}
            borderRadius={"md"}
            p={"1.5rem"}
            color={"white"}
            mr={"0.5rem"}
            _hover={{ bgColor: "#1b1a5570" }}
          >
            برو تست کن
          </Button>
        </a>
        <a href="#call">
          <Button
            bgColor={"transparent"}
            border={"1px solid #1B1A55"}
            _hover={{ bgColor: "#1313136e" }}
            borderRadius={"md"}
            p={"1.5rem"}
            color={"white"}
          >
            تماس با ما
          </Button>
        </a>
      </Box>
    </Box>
  </Box>
);
