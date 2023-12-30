import * as React from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { IoPause } from "react-icons/io5/index.js";
import { IoPlay } from "react-icons/io5/index.js";
import { IoStop } from "react-icons/io5/index.js";
import { ImCross } from "react-icons/im/index.js";
import { FaMicrophone } from "react-icons/fa/index.js";
import type { MetaFunction } from "@remix-run/node";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {
  Avatar,
  Box,
  Textarea,
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
} from "@chakra-ui/react";
import { useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "edit" }, { name: "description", content: "edit voice!" }];
};

export default function App() {
  const [a, setA] = React.useState(false);
  const [text1, setText1] = React.useState("");
  const [text2, setText2] = React.useState("");
  const [finish, setFinish] = React.useState(false);
  const [next, setNext] = React.useState(false);
  const [text, setText] = React.useState<{
    query_id: number;
    query_text: string;
    asr_text: string;
    voice_link: string;
  }>();
  //   {
  //     "query_id": 41,
  //     "query_text": "اسباب بازی مدل ادم اهنی",
  //     "asr_text": "ا",
  //     "voice_link": "https://asr-api2.ussistant.ir/collect/download/9ac951b6-de0a-43bf-8cb6-697da1c27c21.mp3"
  //   }
  const [cansel, setCansel] = React.useState(false);
  const navigate = useNavigate();
  let file: any;
  const getText = () => {
    let url = `https://asr-api2.ussistant.ir/collect/voice/get_voice`;
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
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
        console.log(d),
          setText(d),
          setText1(d.query_text),
          setText2(d.asr_text);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    if (
      !localStorage.getItem("userIdussisstant") ||
      !localStorage.getItem("userIdussisstantRole")
    ) {
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
    let url = `https://asr-api2.ussistant.ir/collect/voice/set_annotate/${
      text?.query_id
    }?user_id=${localStorage.getItem("userIdussisstant")}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "X-API-Key": "c5ac5392-1cd1-477e-b9ae-6fd61d21da01",
        Accept: "application/json",
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        // "Content-Type":
        //   "multipart/form-data; charset=utf-8; boundary=" +
        //   Math.random().toString().substring(2),
        // "Content-Type": "application/x-w"ww-form-urlencoded",
      },
      body: JSON.stringify({
        voice_id: text?.query_id.toString(),
        asr_text: text?.asr_text,
        edited_query_text: text1,
        edited_asr_text: text2,
        valid_voice: true,
      }),
    })
      .then((x) => x.json())
      .then((d) => {
        if (d.message == "Annotations set successfully") {
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
  return (
    <>
      <Box py={{ base: "12", md: "24" }} maxW="7xl" mx="auto">
        <Stack direction="row" spacing="12">
          <Flex flex="1" overflowX={"hidden"}>
            <Container
              border={"#242e59 1px solid"}
              fontFamily={"pinar"}
              float={"right"}
              maxW="3000px"
              w={{ base: "90%", md: "40%" }}
              py={{ base: "4", sm: "8" }}
              px={{ base: "0", sm: "10" }}
              bg={useBreakpointValue({ base: "white", sm: "white" })}
              boxShadow={{ base: "sm", sm: useColorModeValue("sm", "md-dark") }}
              borderRadius={{ base: "md", sm: "xl" }}
            >
              <Stack width={"93%"} mx="auto" spacing="8">
                <Stack spacing="6" align="center">
                  <audio style={{ width: "93%" }} controls>
                    {text?.voice_link && (
                      //      <AudioPlayer
                      //      autoPlay
                      //      src={`https://asr-api2.ussistant.ir/collect/voice/download/${
                      //        text?.voice_link.split("/")[5].split(".")[0]
                      //      }`}
                      //      showJumpControls={false}
                      //      customVolumeControls={[]}
                      //      customAdditionalControls={[]}
                      //    />
                      <source
                        src={`https://asr-api2.ussistant.ir/collect/voice/download/${
                          text?.voice_link.split("/")[5].split(".")[0]
                        }`}
                        type="audio/mp3"
                      />
                    )}
                    Your browser does not support the audio element.
                  </audio>
                </Stack>

                <Stack spacing={"3"} align={"center"}>
                  <Text textAlign={"left"}>متن اصلی</Text>
                  <Textarea
                    onChange={(v) => setText1(v.target.value)}
                    value={text1}
                  />
                  <Text textAlign={"right"}>متن جنریت شده</Text>
                  <Textarea
                    onChange={(v) => setText2(v.target.value)}
                    value={text2}
                  />
                </Stack>

                <Stack
                  hidden={finish ? true : false}
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
          </Flex>
        </Stack>
      </Box>
    </>
  );
}
