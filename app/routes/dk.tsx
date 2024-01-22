import * as React from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { IoPause } from "react-icons/io5/index.js";
import { IoPlay } from "react-icons/io5/index.js";
import { IoStop } from "react-icons/io5/index.js";
import { FiSearch } from "react-icons/fi/index.js";
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
  Img,
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
  Input,
  Spinner,
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
  const [text, setText] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const navigate = useNavigate();
  let file: any;

  React.useEffect(() => {
    setTimeout(() => {
      if (typeof window !== "undefined") {
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

  const handleSearch = () => {
    if (typeof window !== "undefined" && window !== null) {
      window
        .open(`https://www.digikala.com/search/?q=${"شال گردن"}`, "_blank")
        .focus();
    }
  };

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
          //setText()
          // setFinish(false);
          // location.reload();
        }
      })
      .catch((err) => console.log());
  };

  const handleStart = () => {
    onOpen();
    recorderControls.startRecording();
  };

  const handleFinish = () => {
    recorderControls.stopRecording();
    //................. show loading
    setLoading(true);
    setText("شال گردن");
    //.................  API :: send file to get test
    //handleSendAudio()
    setTimeout(() => {
      handleSearch();
      onClose();
    }, 2000);
    //................   cloze loading
    // setLoading(false);
    // .............   update text value

    //...............  cloze modal
    // ............  search in newTab
  };

  return (
    <>
      <Box py={{ base: "3", md: "12" }} maxW="7xl" mx="auto">
        <Stack direction="row" spacing="12">
          <VStack w={"100%"}>
            <>
              <Container
                // border={"#ef4056 1px solid"}
                fontFamily={"yekan"}
                height={"95vh"}
                // float={"right"}
                // maxW="3000px"
                w={{ base: "90%", sm: "80%", md: "60%" }}
                py={{ base: "0", sm: "8" }}
                px={{ base: "2", sm: "10" }}
                bg={useBreakpointValue({ base: "white", sm: "white" })}
                // boxShadow={{
                //   base: "sm",
                //   sm: "md",
                // }}
                borderRadius={{ base: "md", sm: "xl" }}
                position={"relative"}
              >
                <Img
                  mx={"auto"}
                  style={{
                    paddingLeft: "1rem",
                    width: "145px",
                    height: "122px",
                    marginBottom: "-0.5rem",
                    marginTop: "-0.5rem",
                  }}
                  src="https://cdn.worldvectorlogo.com/logos/digikala-3.svg"
                />
                <Stack spacing="8">
                  <HStack
                    borderRadius={"md"}
                    py={"1px"}
                    border={"1px solid #f0f0f1"}
                    float={"right"}
                  >
                    <Box>
                      {a && (
                        <Button
                          _hover={{
                            bgColor: "gary.100",
                            border: "1px solid #f0f0f1",
                          }}
                          bgColor={"#f0f0f1"}
                          border={"1px solid #f0f0f1"}
                          boxShadow={"sm"}
                          p={"3"}
                          onClick={handleStart}
                        >
                          <Icon
                            // _hover={{
                            //   color: "black",
                            // }}
                            color={"gray.500"}
                            transform={"scale(1.2)"}
                            as={FaMicrophone}
                          />
                        </Button>
                      )}
                    </Box>
                    <Input
                      onChange={(e) => setText(e.target.value)}
                      variant={"unstyled"}
                      value={text}
                      placeholder="جستجو کنید .."
                      type="text"
                      style={{
                        direction: "rtl",
                        outline: "none",
                        border: "none",
                      }}
                    />

                    <Box>
                      <Button
                        onClick={handleSearch}
                        bgColor={"transparent"}
                        border={"none"}
                        boxShadow={"sm"}
                        p={"3"}
                        // onClick={handleStart}
                      >
                        <Icon
                          color={"gray.500"}
                          transform={"scale(1.2)"}
                          as={FiSearch}
                        />
                      </Button>
                    </Box>
                  </HStack>
                </Stack>
              </Container>
            </>

            {/* text box */}
          </VStack>
        </Stack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent fontFamily={"yekan"}>
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <HStack
              py={"3rem"}
              mt={"2rem"}
              justifyContent={loading ? "center" : "space-between"}
              width={"100%"}
            >
              {!loading && (
                <>
                  {" "}
                  <Box
                    transform={{ base: "scale(1.5)", md: "scale(1.5)" }}
                    filter={"grayscale(1.4)"}
                    width={"31px"}
                    overflowX={"hidden"}
                    borderRadius={"26px"}
                    // border={"1px gray solid"}
                    shadow={"sm"}
                  >
                    <Box style={{ transform: "translateX(-8px)" }}>
                      <AudioRecorder
                        classes={{
                          AudioRecorderPauseResumeClass: "arash",
                          AudioRecorderDiscardClass: "arash",
                          AudioRecorderStartSaveClass: "arash",
                          AudioRecorderTimerClass: "arash",
                        }}
                        recorderControls={recorderControls}
                        downloadFileExtension="mp3"
                        showVisualizer={true}
                      />
                    </Box>
                  </Box>
                  <Box transition={"opacity 2s ease"} fontSize={"1.5rem"}>
                    {" "}
                    ... در حال گوش دادن{" "}
                  </Box>
                </>
              )}
              {loading && (
                <>
                  <Box fontSize={"1.5rem"} mr={"15px"}>
                    {" "}
                    ... در حال انجام پروسه{" "}
                  </Box>{" "}
                  <Spinner color="red.500" />
                </>
              )}
            </HStack>
          </ModalBody>

          <ModalFooter width={"100%"}>
            {!loading && (
              <Button
                width={"100%"}
                mx={"auto"}
                colorScheme="red"
                mr={3}
                onClick={handleFinish}
              >
                پایان ضبط
              </Button>
            )}
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
