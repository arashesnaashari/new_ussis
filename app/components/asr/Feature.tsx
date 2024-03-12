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
// import { FaArrowLeft } from "react-icons/fa6/index.js";
import { FaArrowLeft } from "react-icons/fa6/index.js";

export const Feature = () => (
  <>
    <Box p={{ base: "0.5em", md: "2rem" }} mx={"auto"} width={"100%"}>
      <Box
        justifyContent={"space-around"}
        height={{ base: "auto", md: "500px" }}
        display={"flex"}
        pt={{ base: "1rem", md: "6rem" }}
        flexFlow={{ base: "column-reverse", md: "row" }}
      >
        <Box
          transform={"scale(0.9)"}
          alignItems={"flex-end"}
          width={{ base: "", md: "50%" }}
          p={"1rem"}
          display={"flex"}
          flexFlow={"column"}
          gap={"15px"}
          justifyContent={"center"}
        >
          <Heading
            fontSize={{ base: "24px", md: "32px" }}
            fontFamily={"yekan"}
            color={"white"}
            textAlign={"right"}
          >
            دقت خیره کننده در تبدیل گفتار به متن
          </Heading>
          <Text
            fontSize={{ base: "15px", md: "19px" }}
            py={"10px"}
            width={{ base: "100%", md: "100%" }}
            textAlign={"right"}
            color={"rgba(226, 223, 223, 0.74)"}
          >
            ابزار تبدیل صوت به متن یوسیستنت، با تکیه بر به‌روزترین مدل‌ها و دانش
            هوش مصنوعی عملکرد بسیار بهتری در مقایسه با ابزارهای تبدیل صوت به متن
            موجود در زبان فارسی دارد. تیم یوسیستنت موفق شده است با تخصص و مهارت
            خود در حوزه یادگیری عمیق و پردازش صوت، مدلی ارائه دهد که دقت و سرعت
            بالایی در تبدیل گفتار در حوزه‌های مختلف موضوعی و صوت‌های کوتاه و
            بلند از خود نشان می‌دهد.
          </Text>
          <Button
            bgColor={"#535c916e"}
            _hover={{ bgColor: "#535C91" }}
            border={"1px solid #535C91"}
            borderRadius={"md"}
            p={"24px"}
            display={"flex"}
            alignItems={"center"}
            flexFlow="row"
            gap="3px"
            fontFamily={"yekan"}
            color={"white"}
          >
            <Box transform={"scale(0.9)"}>
              <FaArrowLeft />
            </Box>
            <Box fontSize={{ base: "15px", md: "20px" }} pt={"3px"}>
              تست
            </Box>
          </Button>
        </Box>
        <Box
          width={{ base: "100%", md: "50%" }}
          p={"1rem"}
          height={{ base: "230px", md: "auto" }}
          backgroundImage={"url(/meshki.jpg)"}
          transform={"scale(0.9)"}
          backgroundPosition={"center"}
          backgroundSize={"cover"}
          borderRadius={"15px"}
        >
          {/* <Img
            borderRadius={"20px"}    
            mx={"auto"}
            width={"450px"}
            height={"250px"}
            objectFit={"cover"}
            // src="/digi.png"
            src="/meshki.jpg"
          /> */}
        </Box>
      </Box>
      <Box
        height={{ base: "auto", md: "500px" }}
        justifyContent={"space-around"}
        display={"flex"}
        pt={{ base: "4rem", md: "6rem" }}
        flexFlow={{ base: "column-reverse", md: "row-reverse" }}
      >
        <Box
          alignItems={{ base: "self-end", md: "self-end" }}
          transform={"scale(0.9)"}
          width={{ base: "100%", md: "50%" }}
          p={"1rem"}
          display={"flex"}
          flexFlow={"column"}
          gap={"15px"}
          justifyContent={"center"}
        >
          <Heading
            textAlign={"right"}
            width={{ base: "100%", md: "100%" }}
            fontSize={{ base: "24px", md: "32px" }}
            fontFamily={"yekan"}
            color={"white"}
          >
            امکان جداسازی گوینده‌ها
          </Heading>
          <Text
            fontSize={{ base: "15px", md: "19px" }}
            py={"10px"}
            width={{ base: "100%", md: "100%" }}
            textAlign={"right"}
            color={"rgba(226, 223, 223, 0.74)"}
          >
            علاوه بر دقت بالا در تبدیل صوت به متن، ابزار ارائه شده توسط یوسیستنت
            قادر است عملیات جداسازی گوینده‌ها در فایل‌های صوتی را با کیفیت بالا
            انجام دهد. این ویژگی، مزیت قابل توجهی برای تبدیل صوت‌ در کاربردهایی
            مانند مصاحبه، پادکست و جلسات به دست می‌دهد. در این متن‌ها گوینده‌ها
            به صورت شفاف تفکیک شده و متن بسیار خواناتر و قابل فهم‌تر خواهد شد.
          </Text>
          <Button
            bgColor={"#535c916e"}
            _hover={{ bgColor: "#535C91" }}
            border={"1px solid #535C91"}
            borderRadius={"md"}
            p={"24px"}
            display={"flex"}
            alignItems={"center"}
            flexFlow="row"
            gap="3px"
            fontFamily={"yekan"}
            color={"white"}
          >
            <Box transform={"scale(0.9)"}>
              <FaArrowLeft />
            </Box>
            <Box fontSize={{ base: "15px", md: "20px" }} pt={"3px"}>
              تست
            </Box>
          </Button>
        </Box>
        <Box
          width={{ base: "100%", md: "50%" }}
          p={"1rem"}
          height={{ base: "230px", md: "auto" }}
          backgroundImage={"url(/sound_red.jpg)"}
          transform={"scale(0.9)"}
          backgroundPosition={"center"}
          backgroundSize={"cover"}
          borderRadius={"15px"}
        >
          {/* <Img
            borderRadius={"20px"}
            mx={"auto"}
            width={"450px"}
            height={"250px"}
            objectFit={"cover"}
            // src="/digi.png"
            src="/meshki.jpg"
          /> */}
        </Box>
      </Box>
      <Box
        height={{ base: "auto", md: "500px" }}
        justifyContent={"space-around"}
        display={"flex"}
        pt={{ base: "4rem", md: "6rem" }}
        flexFlow={{ base: "column-reverse", md: "row" }}
      >
        <Box
          alignItems={"flex-end"}
          width={{ base: "100%", md: "50%" }}
          p={"1rem"}
          transform={"scale(0.9)"}
          display={"flex"}
          flexFlow={"column"}
          gap={"15px"}
          justifyContent={"center"}
        >
          <Heading
            fontSize={{ base: "24px", md: "32px" }}
            fontFamily={"yekan"}
            color={"white"}
            textAlign={"right"}
          >
            سفارشی‌سازی بر اساس نیاز کسب و کار شما
          </Heading>
          <Text
            fontSize={{ base: "15px", md: "19px" }}
            py={"10px"}
            width={{ base: "100%", md: "100%" }}
            textAlign={"right"}
            color={"rgba(226, 223, 223, 0.74)"}
          >
            یوسیستنت می‌تواند برای کسب و کار شما ابزار تبدیل گفتار سفارشی سازی
            شده ارائه دهد. مدل تبدیل صوت به متن یوسیستنت می‌تواند به سرعت و با
            کیفیت برای حوزه‌‌های موضوعی مشخص، نویزهای ویژه و گویش‌های خاص
            سفارشی‌سازی شود تا عملکرد بهتری در کسب و کار شما داشته باشد. اگر
            ابزارهای موجود جوابگوی نیازمندی‌تان در حوزه فعالیت خاص کسب و کار شما
            نیست، یوسیستنت می‌تواند ابزارهای مناسب به شما پیشنهاد دهد.
          </Text>
          <Button
            bgColor={"#535c916e"}
            _hover={{ bgColor: "#535C91" }}
            border={"1px solid #535C91"}
            borderRadius={"md"}
            p={"24px"}
            color={"white"}
            display={"flex"}
            alignItems={"center"}
            flexFlow="row"
            gap="3px"
            fontFamily={"yekan"}
          >
            <Box transform={"scale(0.9)"}>
              <FaArrowLeft />
            </Box>
            <Box fontSize={{ base: "15px", md: "20px" }} pt={"3px"}>
              تست
            </Box>
          </Button>
        </Box>
        <Box
          width={{ base: "100%", md: "50%" }}
          p={"1rem"}
          height={{ base: "230px", md: "auto" }}
          backgroundImage={"url(/soorati.jpg)"}
          transform={"scale(0.9)"}
          backgroundPosition={"center"}
          backgroundSize={"cover"}
          borderRadius={"15px"}
        >
          {/* <Img
            borderRadius={"20px"}
            mx={"auto"}
            width={"450px"}
            height={"250px"}
            objectFit={"cover"}
            // src="/digi.png"
            src="/meshki.jpg"
          /> */}
        </Box>
      </Box>
      <Box
        height={{ base: "auto", md: "500px" }}
        justifyContent={"space-around"}
        display={"flex"}
        pt={{ base: "4rem", md: "6rem" }}
        mb={{ base: "4rem", md: "6rem" }}
        flexFlow={{ base: "column-reverse", md: "row-reverse" }}
      >
        <Box
          alignItems={{ base: "self-end", md: "self-end" }}
          transform={"scale(0.9)"}
          width={{ base: "100%", md: "50%" }}
          p={"1rem"}
          display={"flex"}
          flexFlow={"column"}
          gap={"15px"}
          justifyContent={"center"}
        >
          <Heading
            textAlign={"right"}
            width={{ base: "100%", md: "100%" }}
            fontSize={{ base: "24px", md: "32px" }}
            fontFamily={"yekan"}
            color={"white"}
          >
            امکان یکپارچه‌گی با زیرساخت‌ها و سخت‌افزار مورد استفاده شما
          </Heading>
          <Text
            fontSize={{ base: "15px", md: "19px" }}
            py={"10px"}
            width={{ base: "100%", md: "100%" }}
            textAlign={"right"}
            color={"rgba(226, 223, 223, 0.74)"}
          >
            ابزار تبدیل صوت به متن یوسیستنت می‌تواند برای همخوانی بیشتر با بستر
            نرم‌افزاری و سخت‌افزاری مورد نیاز کسب و کار شما توسعه داده شود. به
            این منظور ملاحظات منابع و محدودیت‌های سخت‌افزاری و نرم‌افزاری کارکرد
            مورد نظر شما مطالعه شده و ابزاری منطبق بر این محدودیت‌ها به شما
            ارائه خواهد شد.
          </Text>
          <Button
            bgColor={"#535c916e"}
            _hover={{ bgColor: "#535C91" }}
            border={"1px solid #535C91"}
            borderRadius={"md"}
            p={"24px"}
            display={"flex"}
            alignItems={"center"}
            flexFlow="row"
            gap="3px"
            fontFamily={"yekan"}
            color={"white"}
          >
            <Box transform={"scale(0.9)"}>
              <FaArrowLeft />
            </Box>
            <Box fontSize={{ base: "15px", md: "20px" }} pt={"3px"}>
              تست
            </Box>
          </Button>
        </Box>
        <Box
          width={{ base: "100%", md: "50%" }}
          p={"1rem"}
          height={{ base: "230px", md: "auto" }}
          backgroundImage={"url(/goosh.png)"}
          transform={"scale(0.9)"}
          backgroundPosition={"center"}
          backgroundSize={"cover"}
          borderRadius={"15px"}
        >
          {/* <Img
            borderRadius={"20px"}
            mx={"auto"}
            width={"450px"}
            height={"250px"}
            objectFit={"cover"}
            // src="/digi.png"
            src="/meshki.jpg"
          /> */}
        </Box>
      </Box>
    </Box>

    {/* keeey */}
    <Box
      width={"100%"}
      px={{ base: "1.2rem", md: "3rem" }}
      py={{ base: "3rem", md: "3rem" }}
      bgColor={"#020515"}
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
      <Box
        mb={"5rem"}
        py={"3rem"}
        display={"flex"}
        flexFlow={"column"}
        alignItems={"center"}
        borderRadius={"md"}
        width={{ base: "100%", md: "70%" }}
        gap={{ base: "0rem", md: "2rem" }}
        mx={"auto"}
        bgColor={"rgba(217, 217, 217, 0.06)"}
      >
        <Box width={"70%"} justifyContent={"space-around"} display={"flex"}>
          <Box p={"20px"} display={"flex"} flexDir={"column"}>
            <Img src="/icon.svg" width={{ base: "40px", md: "50px" }} />
            <Text
              color={"#ABABAB"}
              pt={"10px"}
              fontSize={{ base: "17px", md: "20px" }}
              fontFamily={"yekan"}
            >
              مزیت
            </Text>
          </Box>
          <Box p={"20px"} display={"flex"} flexDir={"column"}>
            <Img src="/icon.svg" width={{ base: "40px", md: "50px" }} />
            <Text
              color={"#ABABAB"}
              pt={"10px"}
              fontSize={{ base: "17px", md: "20px" }}
              fontFamily={"yekan"}
            >
              مزیت
            </Text>
          </Box>
          <Box p={"20px"} display={"flex"} flexDir={"column"}>
            <Img src="/icon.svg" width={{ base: "40px", md: "50px" }} />
            <Text
              color={"#ABABAB"}
              pt={"10px"}
              fontSize={{ base: "17px", md: "20px" }}
              fontFamily={"yekan"}
            >
              مزیت
            </Text>
          </Box>
        </Box>
        <Box width={"70%"} justifyContent={"space-around"} display={"flex"}>
          <Box p={"20px"} display={"flex"} flexDir={"column"}>
            <Img src="/icon.svg" width={{ base: "40px", md: "50px" }} />
            <Text
              color={"#ABABAB"}
              pt={"10px"}
              fontSize={{ base: "17px", md: "20px" }}
              fontFamily={"yekan"}
            >
              مزیت
            </Text>
          </Box>
          <Box p={"20px"} display={"flex"} flexDir={"column"}>
            <Img src="/icon.svg" width={{ base: "40px", md: "50px" }} />
            <Text
              color={"#ABABAB"}
              pt={"10px"}
              fontSize={{ base: "17px", md: "20px" }}
              fontFamily={"yekan"}
            >
              مزیت
            </Text>
          </Box>
          <Box p={"20px"} display={"flex"} flexDir={"column"}>
            <Img src="/icon.svg" width={{ base: "40px", md: "50px" }} />
            <Text
              color={"#ABABAB"}
              pt={"10px"}
              fontSize={{ base: "17px", md: "20px" }}
              fontFamily={"yekan"}
            >
              مزیت
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  </>
);