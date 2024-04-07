import {
  Avatar,
  Box,
  Table,
  Td,
  Tr,
  Th,
  Tbody,
  Thead,
  Text,
  Img,
  Button,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { FaPhone } from "react-icons/fa/index.js";
import { MdEmail } from "react-icons/md/index.js";
import { FaLocationDot } from "react-icons/fa6/index.js";
export const Footer = () => (
  <>
    {/* About */}
    <Box
      width={"100%"}
      maxW={"2000px"}
      mx={"auto"}
      fontFamily={"vazir"}
      py={{ base: "3rem", md: "6rem" }}
      px={{ base: "1rem", md: "2rem" }}
    >
      <Box width={{ base: "100%", md: "70%" }} mx={"auto"}>
        <Text
          textAlign={"center"}
          color={"#C9C5C5"}
          fontSize={{ base: "17px", md: "25px" }}
          style={{ direction: "rtl" }}
        >
          ما در یوسیستنت به دنبال ارائه سرویس‌های نوآور با کیفیت جهانی برای
          استفاده فارسی زبانان و شرکت‌ها به جهت خلق ارزش بهبود تجربه کاربران
          هستیم.
        </Text>
      </Box>
      <Box
        id="call"
        py={"2rem"}
        fontFamily={"vazir"}
        width={{ base: "100%", md: "70%" }}
        mx={"auto"}
        textAlign={"center"}
      >
        <Button
          display={{ base: "flex", md: "none" }}
          mx={"auto"}
          px={"5rem"}
          _hover={{ bgColor: "#1b1a5570" }}
          py={{ base: "1.5rem", md: "2rem" }}
          borderRadius={"md"}
          bgColor={"#1B1A55"}
          fontSize={{ base: "17px", md: "25px" }}
          color="white"
          fontWeight={"normal"}
          width={{ base: "30%", md: "30%" }}
        >
          <a href="tel:09380177320">تماس با ما</a>
        </Button>
      </Box>
      <Box
        width={"100%"}
        // bgColor={"green"}
        mt={"2rem"}
        display={"flex"}
        flexFlow={{ base: "column-reverse", md: "row" }}
        justifyContent={"space-around"}
        alignItems={"end"}
        color={"rgba(226, 223, 223, 0.60)"}
      >
        <Box display={"flex"} mt={{ base: "1rem", md: "auto" }}>
          <Box> ussistant.ai@gmail.com</Box>
          <Box ml={"5px"}>
            <MdEmail transform="scale(1.1)" />
          </Box>
        </Box>

        <Box display={"flex"} mt={{ base: "1rem", md: "auto" }}>
          <Box style={{ direction: "rtl" }}>
            دانشگاه صنعتی شریف – ساختمان شهید ستاری – طبقه 5 واحد 513
          </Box>
          <Box ml={"5px"}>
            <FaLocationDot transform="scale(1)" />
          </Box>
        </Box>
        <Box
          display={"flex"}
          mt={{ base: "1rem", md: "auto" }}
          alignItems={"center"}
        >
          <Box>۰۹۳۸۰۱۷۷۳۲۰</Box>
          <Box ml={"5px"}>
            <FaPhone transform="scale(1)" />
          </Box>
        </Box>
      </Box>
    </Box>
  </>
);
