import * as React from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { IoPause } from "react-icons/io5/index.js";
import { IoPlay } from "react-icons/io5/index.js";
import { IoStop } from "react-icons/io5/index.js";
import { ImCross } from "react-icons/im/index.js";
import { FaMicrophone } from "react-icons/fa/index.js";
import type { MetaFunction } from "@remix-run/node";
import {
  Avatar,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Center,
  useBreakpointValue,
  Flex,
  Heading,
  Icon,
  Container,
  Button,
  useColorModeValue,
  Stack,
  Text,
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
  Divider,
  AccordionIcon,
} from "@chakra-ui/react";
import { useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "create" },
    { name: "description", content: "create voice!" },
  ];
};

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [a, setA] = React.useState(false);
  const [finish, setFinish] = React.useState(false);
  const [count, setCount] = React.useState("");
  const [next, setNext] = React.useState(false);
  const [text, setText] = React.useState<{
    detail: string;
    id: string;
    query_text: string;
  }>();
  // {
  //   detail: "aaaa",
  //   id: "1",
  //   query_text: "کاور پوکو X5 پرو",
  // }
  const [cansel, setCansel] = React.useState(false);
  const navigate = useNavigate();
  let file: any;
  const getText = () => {
    let url = `https://asr-api2.ussistant.ir/collect/voice/get_text?user_id=${localStorage.getItem(
      "userIdussisstant"
    )}`;
    fetch(url, {
      method: "POST",
      headers: {
        "X-API-Key": "c5ac5392-1cd1-477e-b9ae-6fd61d21da01",
      },
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/x-www-form-urlencoded",
      // },
      // body: JSON.stringify(reqBody),
    })
      .then((x) => x.json())
      .then((d) => {
        console.log(d), setText(d);
      })
      .catch((err) => console.log(err));

    fetch(
      `https://asr-api2.ussistant.ir/collect/voice/count_voice/${localStorage.getItem(
        "userIdussisstant"
      )}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-Key": "c5ac5392-1cd1-477e-b9ae-6fd61d21da01",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setCount(data.count_voice_id));
  };

  React.useEffect(() => {
    if (!localStorage.getItem("userIdussisstant")) {
      navigate("/");
    } else {
      getText();
    }
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      if (typeof window !== "undefined") {
        // document.querySelector(".audio-recorder-mic").style.border =
        //   "#242e59 1px solid";
        setA(true);
      }
    }, 300);
  }, []);
  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  // const addAudioElement = (blob: any) => {
  //   setFinish(true);

  // };

  const handleSendAudio = () => {
    let url = "https://asr-api2.ussistant.ir/collect/voice/send_voice";
    file = new File(
      [recorderControls.recordingBlob ? recorderControls.recordingBlob : ""],
      "name.webm",
      { type: "video/webm" }
    );
    var fd = new FormData();
    fd.append("file", file);
    fd.append("query_id", text?.id ?? "");

    fetch(url, {
      method: "POST",
      headers: {
        "X-API-Key": "c5ac5392-1cd1-477e-b9ae-6fd61d21da01",
        Accept: "application/json",
        // "Content-Type": "multipart/form-data",
        // "Content-Type":
        //   "multipart/form-data; charset=utf-8; boundary=" +
        //   Math.random().toString().substring(2),
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: fd,
    })
      .then((x) => x.json())
      .then((d) => {
        if (d.message == "صوت دریافت شد") {
          setFinish(false);
          location.reload();
        }
      })
      .catch((err) => console.log());
  };
  const handleNext = () => {
    console.log();
    location.reload();
  };

  const handleStart = () => {
    recorderControls.startRecording();
  };

  // React.useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     document.querySelector(".audio-recorder-mic").style.border =
  //       "white 1px solid";
  //   }
  // }, [recorderControls.isRecording]);

  const handleStop = () => {
    setFinish(true);
    recorderControls.stopRecording();
  };
  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    let myNode = document.body.querySelector(".playme");
    while (myNode?.firstChild) {
      myNode.removeChild(myNode?.lastChild);
    }

    document.body.querySelector(".playme").appendChild(audio);
  };
  const handleSkip = () => {
    fetch(
      `https://asr-api2.ussistant.ir/collect/voice/set_skip_text/${
        text?.id ? text.id.toString() : ""
      }`,
      {
        method: "PUT",
        headers: {
          accept: "application/json",
          "X-API-Key": "c5ac5392-1cd1-477e-b9ae-6fd61d21da01",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        location.reload();
      });
  };
  return (
    <>
      <Box py={{ base: "12", md: "24" }} maxW="7xl" mx="auto">
        <Stack direction="row" spacing="12">
          <VStack w={"100%"}>
            {+count <= 100 && (
              <>
                <Container
                  border={"#242e59 1px solid"}
                  fontFamily={"pinar"}
                  float={"right"}
                  // maxW="3000px"
                  w={{ base: "90%", md: "40%" }}
                  py={{ base: "0", sm: "8" }}
                  px={{ base: "0", sm: "10" }}
                  bg={useBreakpointValue({ base: "white", sm: "white" })}
                  boxShadow={{
                    base: "sm",
                    sm: useColorModeValue("sm", "md-dark"),
                  }}
                  borderRadius={{ base: "md", sm: "xl" }}
                  position={"relative"}
                >
                  <Button
                    right={"12px"}
                    position={"absolute"}
                    bottom={"12px"}
                    p={"3"}
                    border={"1px #242e59 solid"}
                    bgColor={"white"}
                    color={"#242e59"}
                    onClick={() => handleSkip()}
                  >
                    رد کردن
                  </Button>
                  {true && (
                    <Button
                      left={"12px"}
                      position={"absolute"}
                      bottom={"12px"}
                      p={"3"}
                      // border={"1px #242e59 solid"}
                      bgColor={"white"}
                      color={"#242e59"}
                    >
                      تعداد ویس های شما:{" "}
                      {count.toLocaleString("fa-ir") + " از " + "۱۰۰"}
                    </Button>
                  )}
                  <Stack spacing="8">
                    <Stack spacing="6" align="center">
                      <Box
                        width={{ base: "80%", md: "" }}
                        fontWeight={"500"}
                        textAlign={"center"}
                        // borderRadius={{ base: "none", sm: "xl" }}
                        borderBottom={"#242e59 1px solid"}
                        padding={"1rem"}
                        float={"right"}
                        style={{ direction: "rtl" }}
                      >
                        {text && text.query_text
                          ? text.query_text
                          : text?.detail}
                      </Box>
                    </Stack>

                    <Stack spacing={"3"} align={"center"}>
                      {/* !text?.detail */}
                      {a && (
                        <VStack alignItems={"center"} spacing={"3"}>
                          <Box
                            transform={{ base: "scale(0.8)", md: "scale(1)" }}
                            filter={"grayscale(1.4)"}
                          >
                            <AudioRecorder
                              classes={{
                                AudioRecorderPauseResumeClass: "arash",
                                AudioRecorderDiscardClass: "arash",
                                AudioRecorderStartSaveClass: "arash",
                              }}
                              // onRecordingComplete={(blob) => addAudioElement(blob)}
                              recorderControls={recorderControls}
                              // downloadOnSavePress={true}
                              downloadFileExtension="mp3"
                              showVisualizer={true}
                              onRecordingComplete={addAudioElement}
                            />
                          </Box>
                          {!recorderControls.isRecording && (
                            <Button
                              bgColor={
                                recorderControls.isRecording
                                  ? "gary.100"
                                  : "#242e59"
                              }
                              border={
                                recorderControls.isRecording
                                  ? "1px solid #242e59"
                                  : "none"
                              }
                              boxShadow={"sm"}
                              p={"3"}
                              onClick={handleStart}
                            >
                              <Icon
                                // _hover={{
                                //   color: "black",
                                // }}
                                color={
                                  recorderControls.isRecording
                                    ? "#242e59"
                                    : "white"
                                }
                                transform={"scale(1.2)"}
                                as={FaMicrophone}
                              />
                            </Button>
                          )}
                          {recorderControls.isRecording && (
                            <HStack bgColor={"white"}>
                              <Button
                                bgColor={"red.400"}
                                _hover={{
                                  bgColor: "red.400",
                                }}
                                boxShadow={"sl"}
                                p={"3"}
                                onClick={handleStop}
                              >
                                <Icon
                                  color={"white"}
                                  transform={"scale(0.9)"}
                                  as={IoStop}
                                />
                              </Button>
                              <Button
                                bgColor={"#ebebeb"}
                                boxShadow={"sl"}
                                p={"3"}
                                onClick={recorderControls.stopRecording}
                              >
                                <Icon
                                  color={"gray.800"}
                                  transform={"scale(0.9)"}
                                  as={ImCross}
                                />
                              </Button>

                              {/* <Button
                        bgColor={"#ebebeb"}
                        boxShadow={"sl"}
                        p={"3"}
                        onClick={recorderControls.togglePauseResume}
                      >
                        {recorderControls.isPaused ? (
                          <Icon
                            color={"gray.800"}
                            transform={"scale(0.9)"}
                            as={IoPlay}
                          />
                        ) : (
                          <Icon
                            color={"gray.800"}
                            transform={"scale(0.9)"}
                            as={IoPause}
                          />
                        )}
                      </Button> */}
                            </HStack>
                          )}
                          <div className="playme"></div>
                        </VStack>
                      )}
                    </Stack>

                    <Stack
                      hidden={finish ? false : true}
                      align={"center"}
                      spacing={"6"}
                      mt={"3rem"}
                    >
                      <Button
                        onClick={() => handleSendAudio()}
                        w="80%"
                        color={"whitesmoke"}
                        bgColor={"#242e59"}
                        fontFamily={"pinar"}
                        _hover={{
                          bgColor: "white",
                          color: "black",
                          border: "1px solid #242e59",
                        }}
                      >
                        ! ارسال
                      </Button>
                    </Stack>
                    <Stack
                      hidden={next ? false : true}
                      align={"center"}
                      spacing={"6"}
                      mt="3rem"
                    >
                      <Button
                        color={"whitesmoke"}
                        // w="80%"
                        bgColor={"#242e59"}
                        fontFamily={"pinar"}
                        onClick={() => handleNext()}
                        _hover={{
                          bgColor: "white",
                          color: "black",
                          border: "1px solid #242e59",
                        }}
                      >
                        ! بعدی
                      </Button>
                    </Stack>
                    <Stack align={"center"} spacing={"6"} mt="3rem"></Stack>
                  </Stack>
                </Container>
              </>
            )}
            {+count >= 101 && (
              <>
                {" "}
                <Container
                  mt={"3rem"}
                  border={"#242e59 1px solid"}
                  fontFamily={"pinar"}
                  float={"right"}
                  // maxW="3000px"
                  w={{ base: "90%", md: "40%" }}
                  py={{ base: "0", sm: "8" }}
                  px={{ base: "0", sm: "10" }}
                  bg={useBreakpointValue({ base: "white", sm: "white" })}
                  boxShadow={{
                    base: "sm",
                    sm: useColorModeValue("sm", "md-dark"),
                  }}
                  borderRadius={{ base: "md", sm: "xl" }}
                  position={"relative"}
                >
                  <Stack mt={"2rem"} spacing="8">
                    <Box
                      style={{ direction: "rtl" }}
                      p={{ base: "20px", md: "10px" }}
                    >
                      <Text mb={"1rem"} fontWeight={"600"} fontSize={"1.1rem"}>
                        پایان ! از همکاری شما متشکریم :))
                      </Text>
                    </Box>
                  </Stack>
                </Container>
              </>
            )}
            <Container
              mt={"3rem"}
              border={"#242e59 1px solid"}
              fontFamily={"pinar"}
              float={"right"}
              // maxW="3000px"
              w={{ base: "90%", md: "40%" }}
              py={{ base: "0", sm: "8" }}
              px={{ base: "0", sm: "10" }}
              bg={useBreakpointValue({ base: "white", sm: "white" })}
              boxShadow={{ base: "sm", sm: useColorModeValue("sm", "md-dark") }}
              borderRadius={{ base: "md", sm: "xl" }}
              position={"relative"}
            >
              <Stack spacing="8">
                <Box
                  style={{ direction: "rtl" }}
                  p={{ base: "20px", md: "10px" }}
                >
                  <Accordion
                    defaultIndex={+count > 1 ? [1] : [0]}
                    allowMultiple
                  >
                    <AccordionItem border={"none"}>
                      <AccordionButton
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Text
                          // mb={"1rem"}
                          fontWeight={"600"}
                          fontSize={"1.1rem"}
                        >
                          دستورالعمل ضبط صدا
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel>
                        <Box lineHeight={"32px"}>
                          <p>
                            <span>
                              ممنون از وقتی که برای کمک به جمع&zwnj;آوری داده
                              صوتی اختصاص می&zwnj;دید.
                            </span>
                          </p>
                          <p>&nbsp;</p>
                          <p>
                            <span>
                              در این روند از شما می&zwnj;خوایم که شش تا ده دقیقه
                              از وقتتون رو به ما اختصاص بدید و یکصد عبارت که
                              براتون نمایش داده می&zwnj;شه رو بخونید. این عبارات
                              در حوزه جستجوی صوتی کالاها هستند. لذا فرض کنید که
                              در یک وبسایت خرید اینترنتی هستید و می&zwnj;خواید
                              که بدون استفاده از کیبرد صرفا با نام بردن از کالا
                              و بعضی ویژگی&zwnj;هاش، جستجو براتون انجام بشه.
                            </span>
                          </p>
                          <p>
                            <span>
                              برای راحت&zwnj;تر شدن این روند، ما عبارات رو به
                              شما پیشنهاد می&zwnj;دیم و فقط لازمه شما با فشردن
                              کلید ضبط صدا، به صورت طبیعی اون رو ادا کنید. در
                              این روند لطفا این نکات رو درنظر داشته باشید.
                            </span>
                          </p>
                          <p>&nbsp;</p>
                          <p>
                            <span>
                              ۱- اگر ضبط صدا بدون مشکل انجام شد، با لمس دکمه
                              ارسال
                            </span>{" "}
                            <span>
                              فایل صوتی رو ارسال کنید و به سراغ عبارت بعدی برید.
                            </span>
                          </p>
                          <p>
                            <span>
                              ۲- اگر ضبط صدا ناقص موند یا به هر دلیلی اشتباهی
                              صورت گرفت، فایل رو ارسال نکنید و دوباره عبارت رو
                              ضبط کنید.
                            </span>
                          </p>
                          <p>
                            <span>
                              ۳- اگر عبارت براتون غیرقابل خوندن بود، مثلا کلماتی
                              داشت که نحوه خواندنش براتون محل سوال بود یا دوست
                              نداشتید بخونیدش، می&zwnj;تونید از روی اون عبارت
                              بپرید و به عبارت بعدی برید.
                            </span>
                          </p>
                          <p>
                            <span>
                              ۴- اگر عبارت به نظرتون غیرطبیعی میومد،
                              می&zwnj;تونید با تغییرات جزیی به شکل طبیعی&zwnj;تر
                              درش بیارید و ادا کنید. ولی ترجیحا تغییرات زیاد در
                              عبارات ایجاد نکنید.&nbsp;&nbsp;
                            </span>
                          </p>
                          <p>
                            <span>
                              ۵- کلمات و عبارات انگلیسی رو هرجور که به نظرتون
                              طبیعی&zwnj;تره بخونید. مثلا ultra رو ممکنه افراد
                              آلترا یا اولترا تلفظ کنند. لازم نیست دنبال تلفظ
                              درست یا استاندارد باشید. مهم اینه که جوری بخونید
                              که اگر خودتون دنبال سرچ این محصول بودید،
                              می&zwnj;خوندید.
                            </span>
                          </p>
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Box>
              </Stack>
            </Container>
          </VStack>
        </Stack>
      </Box>
    </>
  );
}
