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
    );
    location.reload();
  };
  return (
    <>
      <Box py={{ base: "12", md: "24" }} maxW="7xl" mx="auto">
        <Stack direction="row" spacing="12">
          <Flex flexFlow={"column"} overflowX={"hidden"}>
            <Container
              border={"#242e59 1px solid"}
              fontFamily={"pinar"}
              float={"right"}
              maxW="3000px"
              w={{ base: "90%", md: "40%" }}
              py={{ base: "0", sm: "8" }}
              px={{ base: "0", sm: "10" }}
              bg={useBreakpointValue({ base: "white", sm: "white" })}
              boxShadow={{ base: "sm", sm: useColorModeValue("sm", "md-dark") }}
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
                  تعداد ویس های شما: {count}
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
                    {text && text.query_text ? text.query_text : text?.detail}
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
                              recorderControls.isRecording ? "#242e59" : "white"
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

            <Container
              mt={"3rem"}
              border={"#242e59 1px solid"}
              fontFamily={"pinar"}
              float={"right"}
              maxW="3000px"
              w={{ base: "90%", md: "40%" }}
              py={{ base: "0", sm: "8" }}
              px={{ base: "0", sm: "10" }}
              bg={useBreakpointValue({ base: "white", sm: "white" })}
              boxShadow={{ base: "sm", sm: useColorModeValue("sm", "md-dark") }}
              borderRadius={{ base: "md", sm: "xl" }}
              position={"relative"}
            >
              <Stack mt={"2rem"} spacing="8">
                <Box style={{ direction: "rtl" }} p={{ base: "20px", md: "" }}>
                  <Text mb={"1rem"}>دستورالعمل ضبط صدا</Text>
                  <Box lineHeight={"32px"}>
                    <ul>
                      <li>
                        <p>
                          <span>
                            در این بخش در هر صفحه یک صوت و دو متن متناظر آن برای
                            شما نمایش داده می&zwnj;شود. هدف این است که این دو
                            متن هردو محتوای صوتی را نمایش دهند.&nbsp;
                          </span>
                        </p>
                        <br />
                        <p>
                          <span>متن اول: متن رفرنس</span>
                        </p>
                        <p>
                          <span>
                            متن اول فقط در صورتی نیاز به تغییر دارد که محتوای
                            متفاوتی با صوت گفته شده داشته باشد. به طور کلی فرض
                            این است که صوت&zwnj;ها از روی متن اول ادا شده و لذا
                            انتظار داریم که تفاوت&zwnj; بسیار کمی مشاهده شود.
                          </span>
                        </p>
                        <br />
                        <p>
                          <span>
                            متن دوم: تبدیل دقیق صوت به کاراکترهای فارسی
                          </span>
                        </p>
                        <p>
                          <span>
                            هدف متن دوم تبدیل صوت به متن با کاراکترهای فقط فارسی
                            است. چالش اصلی این است که بسیاری از عبارات گفته شده
                            در صوت&zwnj;ها حاوی کلمات انگلیسی و فارسی هستند و
                            هدف متن دوم این است که حتی کلمات انگلیسی را فقط با
                            کاراکترهای فارسی نمایش دهد. مثلا iphone &rarr;
                            آیفون، LED&rarr; ال ای دی، sportlight &rarr; اسپورت
                            لایت
                          </span>
                        </p>
                        <p>
                          <span>
                            این کاراکترها باید به طور دقیق منعکس کننده عبارات
                            گفته شده باشد. مثلا ultra ممکن است توسط افراد به
                            صورت&nbsp; آلترا یا اولترا تلفظ شود. در این حالت ما
                            به دنبال تلفظ درست یا استاندارد نیستیم و صرفا
                            می&zwnj;خواهیم آنچه کاربر گفته را پیاده کنیم.
                          </span>
                        </p>
                      </li>
                    </ul>
                  </Box>
                </Box>
              </Stack>
            </Container>
          </Flex>
        </Stack>
      </Box>
    </>
  );
}
