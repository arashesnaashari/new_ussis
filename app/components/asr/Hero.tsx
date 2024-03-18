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
import { GiSoundWaves } from "react-icons/gi/index.js";

export const Hero = () => {
  const handleScroll = () => {
    const container = document.getElementById("test");
    if (container) {
      container.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleScrollCall = () => {
    const container = document.getElementById("call");
    if (container) {
      container.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Box bgColor={"#020515"} w={"100%"}>
      <Box
        fontFamily={"vazir"}
        maxW={"2000px"}
        mx={"auto"}
        display={"flex"}
        flexFlow={{ base: "column", md: "row" }}
        overflow={"hidden"}
        height={{ base: "600px", md: "600px" }}
      >
        <Box
          // overflow={{ base: "hidden", md: "inherit" }}
          // display="flex"
          // flexFlow="column"
          width={"50%"}
          height={"600px"}
          alignSelf="center"
          // ml={{ base: "0rem", md: "10rem" }}
        >
          {/* <Img
            overflowX={{ base: "hidden", md: "auto" }}
            mx={"auto"}
            width={"700px"}
            transform={{ base: "scale(2)", md: "scale(1.8)" }}
            height={{ base: "500px", md: "350px" }}
            src="/wave.svg"
          /> */}
          <Box
            width="100%"
            height="500px"
            display="flex"
            flexFlow="row"
            alignItems="center"
            justifyContent="center"
          >
            {/* <GiSoundWaves
              // color="red"
              style={{ color: "#1B1A55", transform: "scale(30)" }}
              // transform={{ base: "scale(2)", md: "scale(10)" }}
            /> */}
            <svg
              stroke="rgba(226, 223, 223, 0.40)"
              fill="#1B1A55"
              strokeWidth="1"
              viewBox="0 0 512 512"
              strokeLinejoin="round"
              style={{ transform: "scale(40)" }}
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <linearGradient
                id="gradiant"
                x1={"0%"}
                y1={"0%"}
                x2={"100%"}
                y2={"100%"}
              >
                <stop offset={"0%"} stopColor="#535c916e" />
                <stop offset={"100%"} stopColor="black" />
              </linearGradient>
              <path
                fill="url(#gradiant)"
                d="M468.53 236.03H486v39.94h-17.47v-39.94zm-34.426 51.634h17.47v-63.328h-17.47v63.328zm-33.848 32.756h17.47V191.58h-17.47v128.84zm-32.177 25.276h17.47V167.483h-17.47v178.17zm-34.448-43.521h17.47v-92.35h-17.47v92.35zm-34.994 69.879h17.47v-236.06h-17.525v236.06zM264.2 405.9h17.47V106.1H264.2V405.9zm-33.848-46.284h17.47V152.383h-17.47v207.234zm-35.016-58.85h17.47v-87.35h-17.47v87.35zm-33.847-20.823h17.47V231.98h-17.47v48.042zm-33.848 25.66h17.47v-99.24h-17.47v99.272zm-33.302 48.04h17.47V152.678H94.34v201zm-33.847-30.702h17.47V187.333h-17.47v135.642zM26 287.664h17.47v-63.328H26v63.328z"
              ></path>
            </svg>
          </Box>
        </Box>
        <Box
          bgColor={{ base: "#000000b3", md: "transparent" }}
          width={{ base: "100%", md: "50%" }}
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
            fontFamily={"vazir"}
            color={"white"}
          >
            سرویس تایپ صوتی یوسیستنت با امکان سفارشی‌سازی
          </Heading>
          <Box display={"flex"} flexFlow={"row"} justifyContent={"right"}>
            <Text
              fontFamily={"vazir"}
              fontSize={{ base: "16px", md: "20px" }}
              width={{ base: "95%", md: "90%" }}
              // textAlign={"right"}
              color={"rgba(226, 223, 223, 0.60)"}
              textAlign={"justify"}
              style={{ direction: "rtl" }}
              fontWeight={"lighter"}
            >
              سرویس صوت به متن یوسیستنت با تکیه بر حجم عظیمی از داده‌های
              محاوره‌ای و به‌روزترین الگوریتم‌های هوش مصنوعی توسعه یافته است.
              این سرویس با امکان سفارشی‌سازی برای کسب و کارهای مختلف، امکان خلق
              تجربه جدیدی برای مشتریان به ارمغان می‌آورد
            </Text>
          </Box>
          <Box>
            {/* <a href="#test"> */}
            <Button
              bgColor={"#1B1A55"}
              border={"1px solid #1B1A55"}
              borderRadius={"md"}
              p={"1.5rem"}
              color={"white"}
              mr={"0.5rem"}
              onClick={handleScroll}
              _hover={{ bgColor: "#1b1a5570" }}
            >
              برو تست کن
            </Button>
            {/* </a> */}
            {/* <a href="#call"> */}
            <Button
              onClick={handleScrollCall}
              bgColor={"transparent"}
              border={"1px solid #1B1A55"}
              _hover={{ bgColor: "#1313136e" }}
              borderRadius={"md"}
              p={"1.5rem"}
              color={"white"}
            >
              تماس با ما
            </Button>
            {/* </a> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
