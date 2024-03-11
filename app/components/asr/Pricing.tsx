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

export const Pricing = () => (
  <>
    {/* Pricing */}
    <Box
      sx={{
        "#scrollH::-webkit-scrollbar": {
          height: "5px",
        },
        "#scrollH::-webkit-scrollbar-track": {
          bgColor: "gray",
        },
        "#scrollH::-webkit-scrollbar-thumb": {
          backgroundColor: "#020515",
          borderRadius: "5px",
        },
      }}
      borderRadius={"xl"}
      bgColor={"#020515"}
      width={"100%"}
      px={{ base: "1.2rem", md: "3rem" }}
      py={{ base: "3rem", md: "3rem" }}
    >
      <Box width={"100%"} py={"2rem"}>
        <Text
          fontSize={{ base: "20px", md: "32px" }}
          fontFamily={"yekan"}
          fontWeight={{ base: "bold", md: "normal" }}
          textAlign={"center"}
          mx={"auto"}
          color={"white"}
        >
          مزایای استفاده از سرویس یوسیستنت
        </Text>
      </Box>
      <Box id="scrollH" mb="5rem" overflowX={{ base: "scroll", md: "auto" }}>
        <Table
          width={{ base: "100%", md: "70%" }}
          mx={"auto"}
          bgColor={"rgba(217, 217, 217, 0.06)"}
          borderRadius={"xl"}
        >
          <Thead>
            <Tr bgColor={"rgba(217, 217, 217, 0.08)"}>
              <Th
                border={"none"}
                color={"white"}
                fontFamily={"yekan"}
                py={{ base: "2rem", md: "2.5rem" }}
                px={{ base: "1rem", md: "0rem" }}
                textAlign={"center"}
                fontSize={{ base: "12px", md: "1rem" }}
              ></Th>
              <Th
                textAlign={"center"}
                fontSize={{ base: "12px", md: "1rem" }}
                border={"none"}
                color={"white"}
                fontFamily={"yekan"}
              >
                ۰-۱۰ ماه/دقیقه
              </Th>
              <Th
                textAlign={"center"}
                fontSize={{ base: "12px", md: "1rem" }}
                border={"none"}
                color={"white"}
                fontFamily={"yekan"}
              >
                ۱۰-۱۰۰ ماه/دقیقه
              </Th>
              <Th
                textAlign={"center"}
                fontSize={{ base: "12px", md: "1rem" }}
                border={"none"}
                color={"white"}
                fontFamily={"yekan"}
              >
                {">"} ۱۰۰۰ ماه/دقیقه
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Th
                border={"none"}
                color={"white"}
                fontFamily={"yekan"}
                bgColor={"rgba(217, 217, 217, 0.01)"}
                py={{ base: "2rem", md: "2.5rem" }}
                px={{ base: "1rem", md: "0rem" }}
                textAlign={"center"}
                fontSize={{ base: "12px", md: "1rem" }}
              >
                ویس به متن
              </Th>
              <Td
                border={"none"}
                color={"white"}
                fontFamily={"yekan"}
                textAlign={"center"}
                style={{ direction: "rtl" }}
              >
                رایگان
              </Td>
              <Td
                style={{ direction: "rtl" }}
                border={"none"}
                color={"white"}
                fontFamily={"yekan"}
                textAlign={"center"}
              >
                ۷۰تومان/۱۵ثانیه{" "}
              </Td>
              <Td
                style={{ direction: "rtl" }}
                border={"none"}
                color={"white"}
                fontFamily={"yekan"}
                textAlign={"center"}
              >
                {" "}
                ۵۰تومان/۱۵ثانیه{" "}
              </Td>
            </Tr>
            <Tr>
              <Th
                border={"none"}
                color={"white"}
                fontFamily={"yekan"}
                bgColor={"rgba(217, 217, 217, 0.01)"}
                py={{ base: "2rem", md: "2.5rem" }}
                px={{ base: "1rem", md: "0rem" }}
                textAlign={"center"}
                fontSize={{ base: "12px", md: "1rem" }}
              >
                فایل بزرگ
              </Th>
              <Td
                style={{ direction: "rtl" }}
                border={"none"}
                color={"white"}
                fontFamily={"yekan"}
                textAlign={"center"}
              >
                {" "}
                رایگان
              </Td>
              <Td
                style={{ direction: "rtl" }}
                border={"none"}
                color={"white"}
                fontFamily={"yekan"}
                textAlign={"center"}
              >
                {" "}
                ۷۰تومان/۱۵ثانیه{" "}
              </Td>
              <Td
                style={{ direction: "rtl" }}
                border={"none"}
                color={"white"}
                fontFamily={"yekan"}
                textAlign={"center"}
              >
                {" "}
                ۵۰تومان/۱۵ثانیه{" "}
              </Td>
            </Tr>
            <Tr>
              <Th
                border={"none"}
                color={"white"}
                fontFamily={"yekan"}
                bgColor={"rgba(217, 217, 217, 0.01)"}
                py={{ base: "2rem", md: "2.5rem" }}
                px={{ base: "1rem", md: "0rem" }}
                textAlign={"center"}
                fontSize={{ base: "12px", md: "1rem" }}
              >
                تفکیک گوینده
              </Th>
              <Td
                border={"none"}
                style={{ direction: "rtl" }}
                color={"white"}
                fontFamily={"yekan"}
                textAlign={"center"}
              >
                {" "}
                رایگان
              </Td>
              <Td
                style={{ direction: "rtl" }}
                border={"none"}
                color={"white"}
                fontFamily={"yekan"}
                textAlign={"center"}
              >
                {" "}
                ۹۹تومان/۱۵ثانیه{" "}
              </Td>
              <Td
                style={{ direction: "rtl" }}
                border={"none"}
                color={"white"}
                fontFamily={"yekan"}
                textAlign={"center"}
              >
                {" "}
                ۶۰تومان/۱۵ثانیه{" "}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>

    {/* About */}
    <Box
      width={"100%"}
      fontFamily={"yekan"}
      py={{ base: "3rem", md: "6rem" }}
      px={{ base: "1rem", md: "2rem" }}
    >
      <Box width={{ base: "100%", md: "70%" }} mx={"auto"}>
        <Text
          textAlign={"center"}
          color={"#C9C5C5"}
          fontSize={{ base: "17px", md: "25px" }}
        >
          ما بر این باوریم که هر برندی باید صدایی داشته باشد و هر فردی باید
          بتواند به طور طبیعی با محصولات اطراف خود تعامل داشته باشد - فقط با
          صحبت کردن.
        </Text>
      </Box>
      <Box
        id="call"
        py={"2rem"}
        width={{ base: "100%", md: "70%" }}
        mx={"auto"}
        textAlign={"center"}
      >
        <Button
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
    </Box>
  </>
);
