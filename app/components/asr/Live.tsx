import {
  Avatar,
  Input,
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  Img,
  useClipboard,
  Textarea,
  Button,
  HStack,
  Spinner,
  Select,
} from "@chakra-ui/react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { LiaTimesSolid } from "react-icons/lia/index.js";
import * as React from "react";
import { GoCopy } from "react-icons/go/index.js";
import { GoDownload } from "react-icons/go/index.js";
import { useIsMobile } from "../../hooks";
import { FaMicrophone } from "react-icons/fa/index.js";

export const Live = () => {
  //
  const { onCopy, value, setValue, hasCopied } = useClipboard("");
  // for all
  const [tab, setTab] = React.useState("mic"); //large //recognate
  const isMobile = useIsMobile();
  // online mic
  let file: any;
  const [a, setA] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loading2, setLoading2] = React.useState<boolean>(false);

  const [text, setText] = React.useState<string>("");
  // const [src, setText] = React.useState<string>("");
  const [textMic, setTextMic] = React.useState<string>("");
  const [link, setLink] = React.useState<any>("");
  const [linkLarge, setLinkLarge] = React.useState<any>("");
  const [fileGeneral, setFileGeneral] = React.useState<any>("");
  const [text2, setText2] = React.useState<any>([]);
  const [uniqs, setUniqs] = React.useState<any>([]);
  const [speakerCount, setSpeakerCount] = React.useState<any>("");
  const [openmodal, setopenmodal] = React.useState<boolean>(false);
  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );
  React.useEffect(() => {
    setTimeout(() => {
      if (typeof window !== "undefined") {
        setA(true);
      }
    }, 300);
  }, []);
  const handleFinish = async () => {
    recorderControls.stopRecording();
    //................. show loading

    //.................  API :: send file to get test
    //...............  cloze modal
    // onClose();
    //................   cloze loading
    // setLoading(false);
    // .............   update text value

    // ............  search in newTab
    // handleSearch();
  };
  const handleClozee = () => {
    recorderControls.stopRecording();
    setopenmodal(false);
    console.log("cloze");

    // setB(false);
    // onClose();
  };
  const handleStart = () => {
    setTextMic("");
    setValue("");
    setopenmodal(true);
    recorderControls.startRecording();
    // setB(true);
    // onOpen();
  };
  const handleSendAudio = (blob: Blob) => {
    setLoading(true);
    console.log("send");

    file = new File([blob], "name.webm", {
      type: "audio/webm",
    });
    var fd = new FormData();

    console.log(file.size);

    fd.append("file", file);
    fd.append("query_id", text?.id ?? "");
    if (
      file.size < 10000000 &&
      (file.type == "audio/wav" ||
        file.type == "audio/mp3" ||
        file.type == "audio/webm" ||
        file.type == "audio/ogg" ||
        file.type == "audio/flac" ||
        file.type == "audio/aac")
    ) {
      fetch("https://stt.ussistant.ir/api/transcript", {
        method: "POST",
        headers: {
          "X-API-Key": "3f0737b3-b4be-45ef-8749-d5c19bc830bb",
          // Accept: "application/json",
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
          console.log(d);

          setTextMic(d.message);
          setValue(d.message);
          setLoading(false);
          // console.log(openmodal);

          if (d.message.length > 1 && openmodal) {
            // handleSearch(d.messag;
            // alert("new tab");
          }
          setopenmodal(false);

          // location.reload();
        })
        .catch((err) => {
          //setLoading(false), setopenmodal(false)
          console.log(err);
        });
    }
  };
  // large file
  const handleUploadFile = () => {
    console.log("uploadFile");

    const input = document.getElementById("upload");
    let file = new File([input?.files[0]], `filename.${input?.files[0].type}`, {
      type: input?.files[0].type,
    });
    var fd = new FormData();
    fd.append("file", file);
    setLoading2(true);
    const url = URL.createObjectURL(file);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.style.filter = "opacity(0.5)";
    audio.controls = true;
    let myNode = document.body.querySelector(".playme_large");
    while (myNode?.firstChild) {
      myNode.removeChild(myNode?.lastChild);
    }

    document.body.querySelector(".playme_large")?.appendChild(audio);
    if (
      file.size < 10000000 &&
      (file.type == "audio/wav" ||
        file.type == "audio/mp3" ||
        file.type == "audio/mpeg" ||
        file.type == "audio/webm" ||
        file.type == "audio/ogg" ||
        file.type == "audio/flac" ||
        file.type == "audio/aac")
    ) {
      //file.size < 2000000
      fetch("https://stt.ussistant.ir/api/transcript_large", {
        method: "POST",
        headers: {
          "X-API-Key": "3f0737b3-b4be-45ef-8749-d5c19bc830bb",
          // Accept: "application/json",
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
          setText(d.text);
          setLinkLarge(d.download_id);
          setValue(d.text);
          setLoading2(false);
          // const url = URL.createObjectURL(file);
          // const audio = document.createElement("audio");
          // audio.src = url;
          // audio.style.filter = "opacity(0.5)";
          // audio.controls = true;
          // let myNode = document.body.querySelector(".playme_large");
          // while (myNode?.firstChild) {
          //   myNode.removeChild(myNode?.lastChild);
          // }

          // document.body.querySelector(".playme_large")?.appendChild(audio);
        })
        .catch((err) => {
          //, setLoading2(false), setopenmodal(false);
          console.log(err), setLoading2(false);
        });
    } else {
      alert("فرمت یا حجم فایل با فیلتر های سمت ما مغایرت دارد");
      setLoading2(false);
    }
  };
  // let fileGeneral: any;
  // recognate
  const handleUploadFileReco = (state: Boolean, cc: string) => {
    // alert("Www");
    console.log("aaaaa");

    const input = document.getElementById("uploadReco");
    let file;
    if (state) {
      file = new File([input?.files[0]], `filename.${input?.files[0].type}`, {
        type: input?.files[0].type,
      });
      setFileGeneral(file);
      // fileGeneral = file;
    } else {
      console.log("FFFF");
      console.log(fileGeneral);

      file = fileGeneral;
    }

    var fd = new FormData();
    fd.append("file", file);
    fd.append("num_speakers", `${speakerCount ? cc : speakerCount}`);
    setLoading2(true);
    // console.log(file.type);

    if (
      file &&
      file.size < 10000000 &&
      (file.type == "audio/wav" ||
        file.type == "audio/mp3" ||
        file.type == "audio/mpeg" ||
        file.type == "audio/webm" ||
        file.type == "audio/ogg" ||
        file.type == "audio/flac" ||
        file.type == "audio/aac")
    ) {
      //file.size < 2 000 000
      fetch("https://stt.ussistant.ir/api/transcript_speaker", {
        method: "POST",
        headers: {
          "X-API-Key": "3f0737b3-b4be-45ef-8749-d5c19bc830bb",
          // Accept: "application/json",
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
          var xx = [
            {
              text_chunk:
                "سلام آقای جام بزرگ ممنون که پذیرفتین گفته بود شرکت کنین ",
              start: 2.54,
              end: 6.04,
              speaker: 1,
            },
            {
              text_chunk:
                "سلام عرض می کنم خدمت شما باعث افتخاره که خدمتتون به ",
              start: 6.46,
              end: 9.18,
              speaker: 0,
            },
            {
              text_chunk:
                "خیلی ممنون شما بیش از یک دهه است که در  زیست بوم یا اکوسیستم اقتصاد دیجیتال ایران حضور دارین  اصلا کلا اقتصاد دیجیتال و چه تعریفی ازش داریم یا مهم تر از اون چه عناصری و چه بخش هایی در اقتصاد دیجیتال وجود داره به ",
              start: 9.52,
              end: 12.94,
              speaker: 1,
            },
            {
              text_chunk:
                "عرضم به حضور شما که یک چهارچوبی رو آنکتاد استفاده می کنه توی گزارشگری هاش برای تعریف اقساط دیجیتال سه لایه  عنوان می کنند برای اقساط دیجیتال  یک لایه مرکزی یا هسته کره اقساط دیجیتال رو ",
              start: 28.82,
              end: 35.36,
              speaker: 0,
            },
          ];

          setLink(d.download_id);
          var x = d.speakers;
          setText2(d.speakers);

          // var x = xx;
          var y = x.map((t: any) => t.speaker);
          let unique = [...new Set(y)];
          setUniqs(unique);

          setLoading2(false);
          const url = URL.createObjectURL(file);
          const audio = document.createElement("audio");
          audio.src = url;
          audio.style.filter = "opacity(0.5)";
          audio.controls = true;
          let myNode = document.body.querySelector(".playme_reco");
          while (myNode?.firstChild) {
            myNode.removeChild(myNode?.lastChild);
          }

          document.body.querySelector(".playme_reco")?.appendChild(audio);
        })
        .catch((err) => {
          //, setLoading(false), setopenmodal(false);
          console.log(err), setLoading2(false);
        });
    } else {
      alert("فرمت یا حجم فایل با فیلتر های سمت ما مغایرت دارد");
      setLoading2(false);
    }
  };

  //copy and download
  const handleDownload = async () => {
    try {
      let response;
      if (tab == "large") {
        response = await fetch(
          `https://stt.ussistant.ir/api/download/${linkLarge}`,
          {
            method: "GET",
            headers: {
              "X-API-Key": "3f0737b3-b4be-45ef-8749-d5c19bc830bb",
              Accept: "application/json",
              // "Content-Type": "multipart/form-data",
              // "Content-Type":
              //   "multipart/form-data; charset=utf-8; boundary=" +
              //   Math.random().toString().substring(2),
              // "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
      } else {
        response = await fetch(
          `https://stt.ussistant.ir/api/download/${link}`,
          {
            method: "GET",
            headers: {
              "X-API-Key": "3f0737b3-b4be-45ef-8749-d5c19bc830bb",
              Accept: "application/json",
              // "Content-Type": "multipart/form-data",
              // "Content-Type":
              //   "multipart/form-data; charset=utf-8; boundary=" +
              //   Math.random().toString().substring(2),
              // "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
      }

      if (!response.ok) {
        throw new Error("faild");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        link.split(".")[1] == "csv"
          ? "ussistant_file.csv"
          : "ussistant_file.txt";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("error");
    }
  };
  const audioRef = React.useRef(null);
  const [play, setPlay] = React.useState(false);
  const handleTestSample = (type: string) => {
    const dataSpeaker = [
      {
        text_chunk: "سلام آقای جام بزرگ ممنون که پذیرفتین گفته بود شرکت کنین ",
        start: 2.54,
        end: 6.04,
        speaker: 1,
      },
      {
        text_chunk: "سلام عرض می کنم خدمت شما باعث افتخاره که خدمتتون به ",
        start: 6.46,
        end: 9.18,
        speaker: 0,
      },
      {
        text_chunk:
          "خیلی ممنون شما بیش از یک دهه است که در  زیست بوم یا اکوسیستم اقتصاد دیجیتال ایران حضور دارین  اصلا کلا اقتصاد دیجیتال و چه تعریفی ازش داریم یا مهم تر از اون چه عناصری و چه بخش هایی در اقتصاد دیجیتال وجود داره به ",
        start: 9.52,
        end: 12.94,
        speaker: 1,
      },
      {
        text_chunk:
          "عرضم به حضور شما که یک چهارچوبی رو آنکتاد استفاده می کنه توی گزارشگری هاش برای تعریف اقساط دیجیتال سه لایه  عنوان می کنند برای اقساط دیجیتال  یک لایه مرکزی یا هسته کره اقساط دیجیتال رو ",
        start: 28.82,
        end: 35.36,
        speaker: 0,
      },
    ];
    const excel = "2c61fcc8-e408-4a55-a8de-90ca87f5ae7e.csv";
    const txt = "35ca296f-29d7-49ff-be01-3e7857b6ab2f.txt";
    const dataLarge =
      " سلام آقای جام بزرگ ممنون که پذیرفتین گفته بود شرکت کنین سلام عرض می کنم خدمت شما باعث افتخاره که خدمتتون به خیلی ممنون شما بیش از یک دهه است که در زیست بوم یا اکوسیستم اقتصاد دیجیتال ایران حضور دارین اصلا کلا اقتصاد دیجیتال و چه تعریفی ازش داریم یا مهم تر از اون چه عناصری و چه بخش هایی در اقتصاد دیجیتال وجود داره به عرضم به حضور شما که یک چهارچوبی رو آنکتاد استفاده می کنه توی گزارشگری هاش برای تعریف اقساط دیجیتال سه لایه عنوان می کنند برای اقساط دیجیتال یک لایه مرکزی یا هسته کره اقساط دیجیتال رو";
    if (type == "large") {
      setText(dataLarge);
      setLinkLarge(txt);
      setValue(dataLarge);

      const audio = document.createElement("audio");
      audio.src = "/audio.wav";
      audio.style.filter = "opacity(0.5)";
      audio.controls = true;
      let myNode = document.body.querySelector(".playme_large");
      while (myNode?.firstChild) {
        myNode.removeChild(myNode?.lastChild);
      }

      document.body.querySelector(".playme_large")?.appendChild(audio);
    } else {
      setLink(excel);
      var x = dataSpeaker;
      setText2(dataSpeaker);
      var y = x.map((t: any) => t.speaker);
      let unique = [...new Set(y)];
      setUniqs(unique);

      const audio = document.createElement("audio");
      audio.src = "/audio.wav";
      audio.style.filter = "opacity(0.5)";
      audio.controls = true;
      let myNode = document.body.querySelector(".playme_reco");
      while (myNode?.firstChild) {
        myNode.removeChild(myNode?.lastChild);
      }

      document.body.querySelector(".playme_reco")?.appendChild(audio);
    }

    // if (!play) {
    //   audioRef.current;
    //   // console.error("error");

    //   setPlay(true);
    // } else {
    //   // audioRef.current?.pause();
    //   // audioRef.current?.currentTime = 0;
    //   setPlay(false);
    // }
    //set Text equls to sample
    //play the real audio
  };
  const handleCountSpeaker = (e: any) => {
    console.log(e);

    setSpeakerCount(e);
    handleUploadFileReco(false, e);

    //upload again
    // first scenario : we have uploaded a file    save to state
    // second we dont have uploaded file    save in state
  };

  return (
    <>
      <Box
        display={openmodal ? "flex" : "none"}
        justifyContent={"center"}
        alignItems={"center"}
        top={0}
        left={0}
        width={"100%"}
        height={"100%"}
        position={"fixed"}
        zIndex={"333333"}
      >
        <Box
          onClick={handleClozee}
          width={"100%"}
          height={"100%"}
          bgColor={"rgba(0, 0, 0, 0.48)"}
        ></Box>

        <Box
          borderRadius={"md"}
          px={"2rem"}
          py={"2rem"}
          fontFamily={"vazir"}
          // zIndex={"22"}
          pos={"absolute"}
          width={{ base: "90vw", sm: "60vw", md: "40vw", lg: "30vw" }}
          bgColor={"#0F1221"}
          color={"white"}
          mb={{ base: "12rem", md: "13rem" }}
        >
          <Button
            pos={"absolute"}
            top={"6px"}
            right={"1rem"}
            bgColor={"transparent"}
            _hover={{ bgColor: "#1b1a5570" }}
            // boxShadow={"sl"}
            p={"3"}
            onClick={handleClozee}
          >
            <Icon
              color={"gray.600"}
              transform={"scale(1.4)"}
              as={LiaTimesSolid}
            />
          </Button>
          <HStack
            py={"4rem"}
            // mt={"1rem"}
            justifyContent={loading ? "center" : "space-between"}
            width={"100%"}
          >
            <>
              {" "}
              <Box
                transform={{ base: "scale(1.5)", md: "scale(1.5)" }}
                filter={"grayscale(1.4),brightness(0.6)"}
                width={"31px"}
                overflowX={"hidden"}
                borderRadius={"26px"}
                // border={"1px gray solid"}
                shadow={"sm"}
              >
                <Box
                  filter={"brightness(0.6)"}
                  style={{ transform: "translateX(-8px)" }}
                >
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
                    onRecordingComplete={handleSendAudio}
                  />
                </Box>
              </Box>
              {!loading && (
                <Box transition={"opacity 2s ease"} fontSize={"1.5rem"}>
                  {" "}
                  ... در حال گوش دادن{" "}
                </Box>
              )}
            </>
            {loading && (
              <>
                <Box fontSize={"1.5rem"} mr={"15px"}>
                  {" "}
                  ... در حال انجام پروسه{" "}
                </Box>{" "}
                <Spinner color="#1B1A55" />
              </>
            )}
          </HStack>
          {!loading && (
            <>
              <Button
                width={"100%"}
                mx={"auto"}
                bgColor="#1B1A55"
                color={"white"}
                mr={3}
                onClick={handleFinish}
                _hover={{ bgColor: "#1b1a5570" }}
              >
                پایان ضبط
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Box
        bgColor={"#020515"}
        id="test"
        width={"100%"}
        maxW={"2000px"}
        mx={"auto"}
        px={{ base: "1.2rem", md: "3rem" }}
        py={{ base: "3rem", md: "3rem" }}
      >
        <Box width={"100%"} py={"2rem"}>
          <Text
            fontSize={{ base: "20px", md: "32px" }}
            fontFamily={"vazir"}
            fontWeight={{ base: "bold", md: "normal" }}
            textAlign={"center"}
            pb={"2rem"}
            mx={"auto"}
            color={"white"}
          >
            تست محصول{" "}
          </Text>
          <Box
            py={"3rem"}
            mb={"5rem"}
            display={"flex"}
            flexFlow={"column"}
            alignItems={"center"}
            borderRadius={"md"}
            width={{ base: "100%", md: "70%" }}
            gap={{ base: "0rem", md: "2rem" }}
            mx={"auto"}
            bgColor={"rgba(217, 217, 217, 0.06)"}
          >
            {/* tabs */}
            <>
              <Box
                display={"flex"}
                flexFlow={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                borderRadius={"xl"}
                bgColor={"rgba(255, 255, 255, 0.1)"}
                // width={"60%"}
                mx={"auto"}
                py={"5px"}
                gap={"5px"}
                px={{ base: "5px", md: "1rem" }}
              >
                <Button
                  py={"1rem"}
                  fontFamily={"vazir"}
                  _hover={{ bgColor: "#1b1a5570" }}
                  color={"white"}
                  px={"1rem"}
                  bgColor={tab == "recognate" ? "#1B1A55" : "transparent"}
                  borderRadius={"xl"}
                  onClick={() => setTab("recognate")}
                >
                  تفکیک گوینده
                </Button>

                <Button
                  py={"1rem"}
                  fontFamily={"vazir"}
                  color={"white"}
                  px={"1rem"}
                  bgColor={tab == "large" ? "#1B1A55" : "transparent"}
                  borderRadius={"xl"}
                  _hover={{ bgColor: "#1b1a5570" }}
                  onClick={() => setTab("large")}
                >
                  دریافت فایل
                </Button>
                <Button
                  py={"1rem"}
                  zIndex={"1"}
                  fontFamily={"vazir"}
                  color={"white"}
                  px={"1rem"}
                  bgColor={tab == "mic" ? "#1B1A55" : "transparent"}
                  _hover={{ bgColor: "#1b1a5570" }}
                  borderRadius={"xl"}
                  onClick={() => setTab("mic")}
                >
                  میکروفون
                </Button>
              </Box>
            </>
            {/* CTA */}

            {loading2 ? (
              <Box
                bgColor={"#535c916e"}
                _hover={{ bgColor: "#535C91" }}
                border={"1px solid #535C91"}
                borderRadius={"md"}
                px={"1rem"}
                py={"10px"}
                display={"flex"}
                fontFamily={"vazir"}
                mt={"2rem"}
              >
                <Box color={"white"} fontSize={"1rem"} mr={"15px"}>
                  {" "}
                  ... در حال انجام پروسه{" "}
                </Box>{" "}
                <Spinner color="white" />
              </Box>
            ) : (
              <Box py={"3rem"}>
                {" "}
                {tab == "mic" ? (
                  <>
                    {/* CTA */}
                    {a && (
                      <Button
                        _hover={{ bgColor: "#1b1a5570" }}
                        bgColor={"#1B1A55"}
                        px={"1.5rem"}
                        py={"2rem"}
                        borderRadius={"50px"}
                        boxShadow={"sm"}
                        onClick={handleStart}
                      >
                        <Icon
                          // _hover={{
                          //   color: "black",
                          // }}
                          color={"white"}
                          transform={"scale(1.2)"}
                          as={FaMicrophone}
                        />
                      </Button>
                    )}
                  </>
                ) : tab == "large" ? (
                  <Box
                    display={"flex"}
                    flexFlow={"row-reverse"}
                    alignItems={"baseline"}
                  >
                    {" "}
                    <Box>
                      <Input
                        type="file"
                        id="upload"
                        hidden
                        onChange={handleUploadFile}
                      />
                      <label
                        htmlFor="upload"
                        style={{
                          fontFamily: "vazir",
                          fontWeight: "bold",
                          cursor: "pointer",
                          background: "#1B1A55",
                          color: "white",
                          paddingInline: "2rem",
                          paddingBlock: "0.8rem",
                          borderRadius: "10px",
                        }}
                      >
                        آپلود فایل
                      </label>
                    </Box>
                    <Box mx={"12px"} fontFamily={"vazir"} color={"white"}>
                      {/* یا */}
                    </Box>
                    <Button
                      onClick={() => handleTestSample("large")}
                      _hover={{ bgColor: "#1313136e" }}
                      fontFamily="vazir"
                      fontWeight="bold"
                      cursor="pointer"
                      background="transparent"
                      border={"1px solid #1B1A55"}
                      color="white"
                      paddingInline="2rem"
                      paddingBlock="1.5rem"
                      borderRadius="10px"
                    >
                      تست نمونه{" "}
                    </Button>
                    {/* <audio src="/audio.wav" ref={audioRef} /> */}
                  </Box>
                ) : (
                  <>
                    <Box
                      display={"flex"}
                      flexFlow={"column"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Box
                        display={"flex"}
                        flexFlow={"row-reverse"}
                        alignItems={"baseline"}
                      >
                        {" "}
                        <Box>
                          <Input
                            type="file"
                            id="uploadReco"
                            hidden
                            onChange={() => handleUploadFileReco(true, "")}
                          />
                          <label
                            htmlFor="uploadReco"
                            style={{
                              fontFamily: "vazir",
                              fontWeight: "bold",
                              cursor: "pointer",
                              background: "#1B1A55",
                              color: "white",
                              paddingInline: "2rem",
                              paddingBlock: "0.8rem",
                              borderRadius: "10px",
                            }}
                          >
                            آپلود فایل
                          </label>
                        </Box>
                        <Box mx={"12px"} fontFamily={"vazir"} color={"white"}>
                          {/* یا */}
                        </Box>
                        <Button
                          onClick={() => handleTestSample("speaker")}
                          _hover={{ bgColor: "#1313136e" }}
                          fontFamily="vazir"
                          fontWeight="bold"
                          cursor="pointer"
                          background="transparent"
                          border={"1px solid #1B1A55"}
                          color="white"
                          paddingInline="2rem"
                          paddingBlock="1.5rem"
                          borderRadius="10px"
                        >
                          تست نمونه{" "}
                        </Button>
                        {/* <audio src="/audio.wav" ref={audioRef} /> */}
                      </Box>
                      <Box
                        width={"100%"}
                        display={"flex"}
                        flexFlow={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        mt={"1rem"}
                      >
                        <Select
                          value={speakerCount}
                          border={"none"}
                          background={"gray"}
                          // placeholder="انتخاب"
                          mr={"10px"}
                          width={"20%"}
                          name="cars"
                          color={"black"}
                          id="cars"
                          onChange={(e) => {
                            handleCountSpeaker(e.target.value);
                          }}
                        >
                          <option
                            style={{
                              color: "black",
                              backgroundColor: "gray",
                              fontFamily: "10px",
                            }}
                            value="1"
                          >
                            ۱
                          </option>
                          <option
                            style={{
                              color: "black",
                              backgroundColor: "gray",
                              fontFamily: "10px",
                            }}
                            value="2"
                          >
                            ۲
                          </option>
                          <option
                            style={{
                              color: "black",
                              backgroundColor: "gray",
                              fontFamily: "10px",
                            }}
                            value="3"
                          >
                            ۳
                          </option>
                          <option
                            style={{
                              color: "black",
                              backgroundColor: "gray",
                              fontFamily: "10px",
                            }}
                            value="4"
                          >
                            ۴
                          </option>
                          <option
                            style={{
                              color: "black",
                              backgroundColor: "gray",
                              fontFamily: "10px",
                            }}
                            value="5"
                          >
                            ۵
                          </option>
                          <option
                            style={{
                              color: "black",
                              backgroundColor: "gray",
                              fontFamily: "10px",
                            }}
                            value="6"
                          >
                            ۶
                          </option>
                          <option
                            style={{
                              color: "black",
                              backgroundColor: "gray",
                              fontFamily: "10px",
                            }}
                            value="7"
                          >
                            ۷
                          </option>
                          <option
                            style={{
                              color: "black",
                              backgroundColor: "gray",
                              fontFamily: "10px",
                            }}
                            value="8"
                          >
                            ۸
                          </option>
                          <option
                            style={{
                              color: "black",
                              backgroundColor: "gray",
                              fontFamily: "10px",
                            }}
                            value="9"
                          >
                            ۹
                          </option>
                          <option
                            style={{
                              color: "black",
                              backgroundColor: "gray",
                              fontFamily: "10px",
                            }}
                            value="10"
                          >
                            ۱۰
                          </option>
                        </Select>
                        <label
                          htmlFor="cars"
                          style={{
                            color: "white",
                            fontSize: "13px",
                            direction: "rtl",
                          }}
                        >
                          بالا بردن دقت با انتخاب تعداد اسپیکر
                        </label>
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            )}

            <Box
              width={{ base: "90%", md: "70%" }}
              sx={{
                "#scrollH::-webkit-scrollbar": {
                  height: "5px",
                  width: "2px",
                },
                "#scrollH::-webkit-scrollbar-track": {
                  bgColor: "transparent",
                  width: "2px",
                },
                "#scrollH::-webkit-scrollbar-thumb": {
                  backgroundColor: "gray",
                  borderRadius: "10px",
                },
              }}
            >
              {/* text */}
              {tab == "recognate" ? (
                <>
                  <Box
                    mt={"2rem"}
                    display={"flex"}
                    flexFlow={"row"}
                    justifyContent={"right"}
                  >
                    {uniqs.map((e: any) => {
                      return (
                        <Box
                          color={"white"}
                          borderRadius={"md"}
                          mr={"7px"}
                          px={"7px"}
                          py={"7px"}
                          fontSize={"12px"}
                          fontFamily={"vazir"}
                          bgColor={
                            e == 0
                              ? "#020515"
                              : e == 1
                              ? "#535C91"
                              : e == 2
                              ? "#1B1A55"
                              : e == 3
                              ? "#0F1221"
                              : e == 4
                              ? "blue"
                              : "lightblue"
                          }
                        >
                          {e == 0
                            ? "گوینده اول"
                            : e == 1
                            ? "گوینده دوم"
                            : e == 2
                            ? "گوینده سوم"
                            : e == 3
                            ? "گوینده چهارم"
                            : e == 4
                            ? "گوینده پنجم"
                            : "گوینده ششم"}
                        </Box>
                      );
                    })}
                  </Box>
                  <Box
                    id="scrollH"
                    style={{ direction: "rtl" }}
                    border={"none"}
                    height={"100px"}
                    overflowY={"scroll"}
                    color="white"
                    my={"2rem"}
                    borderRadius={"0"}
                    borderBottom={"1px solid rgba(255, 255, 255, 0.15)"}
                  >
                    {/* {text2} */}
                    {text2.map((e: any) => (
                      <Box
                        mx={"1rem"}
                        fontFamily={"vazir"}
                        color={"white"}
                        my={"10px"}
                        bgColor={
                          e.speaker == 0
                            ? "#020515"
                            : e.speaker == 1
                            ? "#535C91"
                            : e.speaker == 2
                            ? "#1B1A55"
                            : e.speaker == 3
                            ? "#0F1221"
                            : e.speaker == 4
                            ? "blue"
                            : "lightblue"
                        }
                      >
                        {e.text_chunk}
                      </Box>
                    ))}
                  </Box>
                </>
              ) : tab == "large" ? (
                <>
                  <Textarea
                    fontFamily={"vazir"}
                    isReadOnly
                    style={{ direction: "rtl" }}
                    border={"none"}
                    rows={4}
                    color="white"
                    placeholder="متن گفتار"
                    my={"2rem"}
                    borderRadius={"0"}
                    borderBottom={"1px solid rgba(255, 255, 255, 0.15)"}
                    value={text}
                  >
                    {/* {text} */}
                  </Textarea>
                </>
              ) : (
                <>
                  <Textarea
                    isReadOnly
                    style={{ direction: "rtl" }}
                    border={"none"}
                    rows={4}
                    color="white"
                    placeholder="متن گفتار"
                    my={"2rem"}
                    borderRadius={"0"}
                    borderBottom={"1px solid rgba(255, 255, 255, 0.15)"}
                    value={textMic}
                    fontFamily={"vazir"}
                  >
                    {/* {text} */}
                  </Textarea>
                </>
              )}

              {/* buttons.. */}
              <Box
                color="white"
                display={"flex"}
                // border={"1px rgba(255, 255, 255, 0.15) solid"}
                borderRadius={"md"}
                flexFlow={{ base: "row", md: "row" }}
                fontFamily={"vazir"}
                width={"100%"}
                px={"8px"}
                py={"2px"}
                alignItems={"center"}
                flexWrap={"wrap"}
                gap={"10px"}
                justifyContent={"space-between"}
              >
                <Button
                  order={1}
                  height={"30px"}
                  color={"rgba(255, 255, 255, 0.8)"}
                  fontSize={"10px"}
                  display={"flex"}
                  flexFlow={"row"}
                  bgColor={"#535c916e"}
                  _hover={{ bgColor: "#535C91" }}
                  border={"1px solid #535C91"}
                  alignItems={"center"}
                  onClick={onCopy}
                >
                  <Box display={"flex"} flexFlow={"row"} alignItems={"center"}>
                    <Box>{hasCopied ? "! کپی شد" : "کپی متن"}</Box>
                    <Box pl={"4px"} transform={"scale(1.2)"}>
                      <GoCopy />
                    </Box>
                  </Box>
                </Button>
                {tab == "large" ? (
                  <Box
                    hidden={text == "" ? true : false}
                    order={{ base: 3, md: 2 }}
                    transform={"scale(0.8)"}
                    background="midnightblue"
                    borderRadius="34px"
                    color={"white"}
                    className="playme_large"
                  ></Box>
                ) : tab == "recognate" ? (
                  <Box
                    hidden={text2 == "" ? true : false}
                    order={{ base: 3, md: 2 }}
                    transform={"scale(0.8)"}
                    background="midnightblue"
                    borderRadius="34px"
                    color={"white"}
                    className="playme_reco"
                  >
                    {/* <audio ></audio> */}
                  </Box>
                ) : (
                  <></>
                )}

                <Button
                  order={{ base: 2, md: 3 }}
                  // border={"2px #1B1A55 solid"}
                  color={"rgba(255, 255, 255, 0.8)"}
                  // bgColor={"#1313136e"}
                  fontSize={"10px"}
                  display={"flex"}
                  flexFlow={"row"}
                  alignItems={"center"}
                  height={"30px"}
                  bgColor={"#535c916e"}
                  onClick={handleDownload}
                  _hover={{ bgColor: "#535C91" }}
                  border={"1px solid #535C91"}
                  hidden={tab == "mic" ? true : false}
                >
                  <Box>دانلود فایل</Box>
                  <Box pl={"4px"} transform={"scale(1.2)"}>
                    <GoDownload />
                  </Box>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
