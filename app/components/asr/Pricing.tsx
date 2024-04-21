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
      bgColor={"#0F1221"}
      width={"100%"}
      px={{ base: "1.2rem", md: "3rem" }}
      py={{ base: "3rem", md: "3rem" }}
    >
      <Box maxW={"2000px"} mx={"auto"} width={"100%"} py={"2rem"}>
        <Text
          fontSize={{ base: "20px", md: "32px" }}
          fontFamily={"vazir"}
          fontWeight={{ base: "bold", md: "normal" }}
          textAlign={"center"}
          mx={"auto"}
          color={"white"}
          mb={"1rem"}
        >
          هزینه خدمات صوت به متن یوسیستنت
        </Text>
      </Box>
      <Box
        maxW={"2000px"}
        mx={"auto"}
        id="scrollH"
        style={{ direction: "rtl" }}
        overflowX={{ base: "scroll", md: "auto" }}
      >
        <Table
          style={{ direction: "rtl" }}
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
                fontFamily={"vazir"}
                py={{ base: "2rem", md: "2.5rem" }}
                px={{ base: "1rem", md: "3rem" }}
                textAlign={"center"}
                fontSize={{ base: "12px", md: "15px" }}
              >
                نام محصول
              </Th>
              <Th
                textAlign={"center"}
                fontSize={{ base: "12px", md: "15px" }}
                border={"none"}
                color={"white"}
                fontFamily={"vazir"}
                width={"200px"}
              >
                امکانات
              </Th>
              <Th
                textAlign={"center"}
                fontSize={{ base: "12px", md: "15px" }}
                border={"none"}
                color={"white"}
                fontFamily={"vazir"}
              >
                ماهانه تا ۱۰ دقیقه
              </Th>
              <Th
                textAlign={"center"}
                fontSize={{ base: "12px", md: "15px" }}
                border={"none"}
                color={"white"}
                fontFamily={"vazir"}
              >
                ماهانه ۱۰ تا ۱۰۰ دقیقه‌
              </Th>
              <Th
                textAlign={"center"}
                fontSize={{ base: "12px", md: "15px" }}
                border={"none"}
                color={"white"}
                fontFamily={"vazir"}
              >
                ماهانه بیش از ۱۰۰ دقیقه
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr borderBottom={"1px solid #8080800d"}>
              <Th
                border={"none"}
                color={"white"}
                fontFamily={"vazir"}
                bgColor={"rgba(217, 217, 217, 0.01)"}
                py={{ base: "2rem", md: "2.5rem" }}
                px={{ base: "1rem", md: "0rem" }}
                textAlign={"center"}
                fontSize={{ base: "12px", md: "15px" }}
              >
                ویس سرچ
              </Th>
              <Td
                border={"none"}
                color={"#ABABAB"}
                fontFamily={"vazir"}
                textAlign={"center"}
                style={{ direction: "rtl" }}
                width={"300px"}
                display={"flex"}
                flexFlow={"column"}
                gap={"14px"}
                fontSize={{ base: "15px", md: "15px" }}
                alignItems={"center"}
              >
                <Box>پذیرش فایل‌های کوتاه زیر ۳۰</Box>
                <Box>سرعت بالاتر</Box>
                <Box>امکان اتصال به موتور جستجو</Box>
              </Td>
              <Td
                style={{ direction: "rtl" }}
                border={"none"}
                color={"#ABABAB"}
                fontFamily={"vazir"}
                textAlign={"center"}
              >
                رایگان
              </Td>
              <Td
                style={{ direction: "rtl" }}
                border={"none"}
                color={"#ABABAB"}
                fontFamily={"vazir"}
                textAlign={"center"}
                fontSize={{ base: "15px", md: "17px" }}
                // fontWeight={"bold"}
              >
                دقیقه‌ای ۲۱۰ تومان
              </Td>
              <Td
                style={{ direction: "rtl" }}
                border={"none"}
                color={"#ABABAB"}
                fontFamily={"vazir"}
                textAlign={"center"}
                fontSize={{ base: "15px", md: "17px" }}
                // fontWeight={"bold"}
              >
                دقیقه‌ای ۱۵۰ تومان
              </Td>
            </Tr>
            <Tr borderBottom={"1px solid #8080800d"}>
              <Th
                border={"none"}
                color={"white"}
                fontFamily={"vazir"}
                bgColor={"rgba(217, 217, 217, 0.01)"}
                py={{ base: "2rem", md: "2.5rem" }}
                px={{ base: "1rem", md: "0rem" }}
                textAlign={"center"}
                fontSize={{ base: "12px", md: "15px" }}
              >
                سوشال مدیا
              </Th>

              <Td
                border={"none"}
                color={"#ABABAB"}
                fontFamily={"vazir"}
                textAlign={"center"}
                style={{ direction: "rtl" }}
                display={"flex"}
                flexFlow={"column"}
                gap={"14px"}
                fontSize={{ base: "15px", md: "15px" }}
                alignItems={"center"}
              >
                <Box>پذیرش فایل‌های صوتی از۳۰ تا ۹۰ ثانیه</Box>
                <Box>خروجی متنی قابل ویرایش در فرمت‌‌ دلخواه</Box>
                <Box>امکان تولید فایل زیرنویس چسبیده</Box>
              </Td>
              <Td
                style={{ direction: "rtl" }}
                border={"none"}
                color={"#ABABAB"}
                fontFamily={"vazir"}
                textAlign={"center"}
              >
                رایگان
              </Td>
              <Td
                border={"none"}
                color={"#ABABAB"}
                fontFamily={"vazir"}
                textAlign={"center"}
                style={{ direction: "rtl" }}
                fontSize={{ base: "15px", md: "17px" }}
                // fontWeight={"bold"}
              >
                دقیقه‌ای ۲۸۰ تومان
              </Td>
              <Td
                border={"none"}
                color={"#ABABAB"}
                fontFamily={"vazir"}
                textAlign={"center"}
                style={{ direction: "rtl" }}
                fontSize={{ base: "15px", md: "17px" }}
                // fontWeight={"bold"}
              >
                دقیقه‌ای ۲۰۰ تومان
              </Td>
            </Tr>
            <Tr borderBottom={"1px solid #8080800d"}>
              <Th
                border={"none"}
                color={"white"}
                fontFamily={"vazir"}
                bgColor={"rgba(217, 217, 217, 0.01)"}
                py={{ base: "2rem", md: "2.5rem" }}
                px={{ base: "1rem", md: "0rem" }}
                textAlign={"center"}
                fontSize={{ base: "12px", md: "15px" }}
              >
                تایپ صوتی
              </Th>
              <Td
                style={{ direction: "rtl" }}
                border={"none"}
                color={"#ABABAB"}
                fontFamily={"vazir"}
                textAlign={"center"}
                display={"flex"}
                flexFlow={"column"}
                gap={"14px"}
                fontSize={{ base: "15px", md: "15px" }}
                alignItems={"center"}
              >
                <Box>پذیرش فایل‌های صوتی بالای ۹۰ ثانیه</Box>
                <Box>مقرون به صرفه</Box>
              </Td>
              <Td
                style={{ direction: "rtl" }}
                border={"none"}
                color={"#ABABAB"}
                fontFamily={"vazir"}
                textAlign={"center"}
              >
                رایگان
              </Td>
              <Td
                style={{ direction: "rtl" }}
                border={"none"}
                color={"#ABABAB"}
                fontFamily={"vazir"}
                textAlign={"center"}
                fontSize={{ base: "15px", md: "17px" }}
                // fontWeight={"bold"}
              >
                دقیقه‌ای ۲۰۰ تومان
              </Td>
              <Td
                style={{ direction: "rtl" }}
                border={"none"}
                color={"#ABABAB"}
                fontFamily={"vazir"}
                textAlign={"center"}
                fontSize={{ base: "15px", md: "17px" }}
                // fontWeight={"bold"}
              >
                دقیقه‌ای ۱۴۰ تومان
              </Td>
            </Tr>
            <Tr>
              <Th
                border={"none"}
                color={"white"}
                fontFamily={"vazir"}
                bgColor={"rgba(217, 217, 217, 0.01)"}
                py={{ base: "2rem", md: "2.5rem" }}
                px={{ base: "1rem", md: "0rem" }}
                textAlign={"center"}
                fontSize={{ base: "12px", md: "15px" }}
              >
                مصاحبه
              </Th>
              <Td
                border={"none"}
                style={{ direction: "rtl" }}
                color={"#ABABAB"}
                fontFamily={"vazir"}
                textAlign={"center"}
                display={"flex"}
                flexFlow={"column"}
                gap={"14px"}
                fontSize={{ base: "15px", md: "15px" }}
                alignItems={"center"}
              >
                <Box>تبدیل فایل صوتی با تفکیک گوینده</Box>
                <Box>بدون محدودیت زمانی در دریافت فایل</Box>
                <Box>تشخیص گوینده تا ۵ نفر</Box>
              </Td>
              <Td
                border={"none"}
                style={{ direction: "rtl" }}
                color={"#ABABAB"}
                fontFamily={"vazir"}
                textAlign={"center"}
              >
                رایگان
              </Td>
              <Td
                border={"none"}
                style={{ direction: "rtl" }}
                color={"#ABABAB"}
                fontFamily={"vazir"}
                textAlign={"center"}
                fontSize={{ base: "15px", md: "17px" }}
                // fontWeight={"bold"}
              >
                دقیقه‌ای ۳۸۰ تومان
              </Td>
              <Td
                border={"none"}
                style={{ direction: "rtl" }}
                color={"#ABABAB"}
                fontFamily={"vazir"}
                textAlign={"center"}
                fontSize={{ base: "15px", md: "17px" }}
                // fontWeight={"bold"}
              >
                دقیقه‌ای ۲۷۰ تومان
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      <Box
        maxW={"2000px"}
        mb="5rem"
        width={{ base: "100%", md: "70%" }}
        mx={"auto"}
        color={"rgba(226, 223, 223, 0.60)"}
        textAlign={"center"}
        fontFamily={"vazir"}
        mt={"1rem"}
        fontWeight={"bold"}
      >
        امکان طراحی پیشنهاد اختصاصی جهت استفاده در مقیاس‌ بالا مخصوص کسب و کارها
        وجود دارد
      </Box>
    </Box>
  </>
);
