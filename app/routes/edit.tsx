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
  useDisclosure,
  Stack,
  Text,
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "edit" }, { name: "description", content: "edit voice!" }];
};

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [a, setA] = React.useState(false);
  const [count, setCount] = React.useState("");
  const [text1, setText1] = React.useState("");
  const [text2, setText2] = React.useState("");
  const [finish, setFinish] = React.useState(false);
  const [next, setNext] = React.useState(false);
  const [text, setText] = React.useState<{
    query_id: number;
    query_text: string;
    asr_text: string;
    message?: string;
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
        setText(d), setText1(d.query_text), setText2(d.asr_text);
      })
      .catch((err) => console.log(err));

    fetch(
      `https://asr-api2.ussistant.ir/collect/voice/count_annotated_voice/${localStorage.getItem(
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
    if (
      !localStorage.getItem("userIdussisstant") ||
      localStorage.getItem("userIdussisstantRole") !== "true"
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

  const handleSendAudio = (clear: boolean) => {
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
        valid_voice: clear,
      }),
    })
      .then((x) => x.json())
      .then((d) => {
        if (d.message == "برچسب گذاری انجام شد") {
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
          <Flex flexFlow={"column"} overflowX={"hidden"}>
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
              pos={"relative"}
            >
              {text?.message ? (
                <></>
              ) : (
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

              {text?.message ? (
                <Stack width={"93%"} mx="auto" spacing="8">
                  <Stack
                    width={"100%"}
                    height={"4rem"}
                    spacing="6"
                    align="center"
                  >
                    {" "}
                    <Text>{text.message}</Text>{" "}
                  </Stack>
                </Stack>
              ) : (
                <Stack width={"93%"} mx="auto" spacing="8">
                  <Stack spacing="6" align="center">
                    <audio autoPlay style={{ width: "93%" }} controls>
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
                      style={{ direction: "rtl" }}
                      onChange={(v) => setText1(v.target.value)}
                      value={text1}
                    />
                    <Text textAlign={"right"}>متن جنریت شده</Text>
                    <Textarea
                      style={{ direction: "rtl" }}
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
                      onClick={() => handleSendAudio(true)}
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
                      ! ثبت
                    </Button>
                    <Button
                      onClick={() => handleSendAudio(false)}
                      w="80%"
                      color={"#242e59"}
                      bgColor={"white"}
                      border={"1px solid #242e59"}
                      fontFamily={"pinar"}
                      _hover={{
                        bgColor: "white",
                        color: "black",
                        border: "1px solid #242e59",
                      }}
                    >
                      فایل صوتی نامشخص
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
              )}
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
                  <Text fontWeight={"500"} fontSize={"1.1rem"} mb={"1rem"}>
                    دستورالعمل چک و تایید داده‌ها
                  </Text>
                  <Box lineHeight={"32px"}>
                    <p>
                      <span>
                        در این بخش در هر صفحه یک صوت و دو متن متناظر آن برای شما
                        نمایش داده می&zwnj;شود. هدف این است که این دو متن هردو
                        محتوای صوتی را نمایش دهند.&nbsp;
                      </span>
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <span>متن اول: متن رفرنس</span>
                    </p>
                    <p>
                      <span>
                        متن اول فقط در صورتی نیاز به تغییر دارد که محتوای
                        متفاوتی با صوت گفته شده داشته باشد. به طور کلی فرض این
                        است که صوت&zwnj;ها از روی متن اول ادا شده و لذا انتظار
                        داریم که تفاوت&zwnj; بسیار کمی مشاهده شود.
                      </span>
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <span>متن دوم: تبدیل دقیق صوت به کاراکترهای فارسی</span>
                    </p>
                    <p>
                      <span>
                        هدف متن دوم تبدیل صوت به متن با کاراکترهای فقط فارسی
                        است. چالش اصلی این است که بسیاری از عبارات گفته شده در
                        صوت&zwnj;ها حاوی کلمات انگلیسی و فارسی هستند و هدف متن
                        دوم این است که حتی کلمات انگلیسی را فقط با کاراکترهای
                        فارسی نمایش دهد. مثلا iphone =&gt; آیفون، LED =&gt; ال
                        ای دی، sportlight =&gt; اسپورت لایت
                      </span>
                    </p>
                    <p>
                      <span>
                        این کاراکترها باید به طور دقیق منعکس کننده عبارات گفته
                        شده باشد. مثلا ultra ممکن است توسط افراد به صورت&nbsp;
                        آلترا یا اولترا تلفظ شود. در این حالت ما به دنبال تلفظ
                        درست یا استاندارد نیستیم و صرفا می&zwnj;خواهیم آنچه
                        کاربر گفته را پیاده کنیم.
                      </span>
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <span>نکات کار با سامانه:</span>
                    </p>
                    <ul>
                      <li>
                        <span>
                          در صورت عدم وجود صدای انسان در صوت پخش شده گزینه "فایل
                          صوتی نامشخص" را انتخاب کنید
                        </span>
                      </li>
                      <li>
                        <span>
                          در صورتی که صوت و دستور فرد از ابتدا یا انتها ناقص است
                          یا به نظر می آید که قبل از اتمام صحبت گوینده ضبط صدا
                          متوقف شده است&nbsp; گزینه "فایل صوتی نامشخص" را انتخاب
                          کنید
                        </span>
                      </li>
                    </ul>
                  </Box>
                  <Text fontWeight={"500"} fontSize={"1.1rem"} my={"1rem"}>
                    قوانین زیرنویس نویسی:
                  </Text>
                  <Box lineHeight={"32px"}>
                    <ul>
                      <li>
                        <span>
                          همزه ها رو ی بنویسیم: آلوئه ورا =&gt; آلویه ورا،
                          شیائومی =&gt; شیایومی
                        </span>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <span>اعداد به صورت حرف نوشته بشه:&nbsp;</span>
                      </li>
                    </ul>
                    <p>
                      <span>آیفون ۱۵ =&gt; آیفون پانزده/ آیفون پانزده</span>
                    </p>
                    <p>
                      <span>سامسونگ مدل A32 =&gt; سامسونگ مدل آ سی و دو</span>
                    </p>
                    <ul>
                      <li>
                        <span>آی باکلاه رو با کلاه بنویسیم!</span>
                      </li>
                      <li>
                        <span>
                          در کلماتی که ها ی جمع دارند، ها با فاصله نوشته
                          شود.&nbsp;
                        </span>
                      </li>
                    </ul>
                    <p>
                      <span>دستها =&gt; دست ها</span>
                    </p>
                    <ul>
                      <li>
                        <span>
                          نیم فاصله ها به فاصله تبدیل شوند. مثال:&nbsp;
                        </span>
                      </li>
                    </ul>
                    <p>
                      <span>نیم&zwnj;سکه =&gt; نیم سکه</span>
                    </p>
                    <p>
                      <span>تی&zwnj;شرت =&gt; تی شرت</span>
                    </p>
                    <ul>
                      <li>
                        <span>
                          در کلمات تنوین دار، تنوین به صورت الف ساده نوشته شود.
                        </span>
                      </li>
                    </ul>
                    <p>
                      <span>حتماً =&gt; حتما</span>
                    </p>
                    <p>
                      <span>لطفاً =&gt; لطفا</span>
                    </p>
                    <ul>
                      <li>
                        <span>ای نکره یا نسبت به صورت جدا نوشته شود&nbsp;</span>
                      </li>
                    </ul>
                    <p>
                      <span>مثال: </span>
                      <span>شلوار مردانه پارچه ای</span>
                    </p>
                    <ul>
                      <li>
                        <span>
                          در کلماتی مانند مدل دستگاه که چند حرف انگلیسی پشت سر
                          هم دارد، حروف با کاراکترهای فارسی و جدا جدا نوشته
                          شوند.
                        </span>
                      </li>
                    </ul>
                    <p>
                      <span>اسپیکر JBL &rarr; اسپیکر جی بی ال</span>
                    </p>
                    <ul>
                      <li>
                        <span>
                          همزه یا ی که بعد از کلمات منتهی به ه، به عنوان کسره
                          اضافه می شود لازم نیست به هیچ صورتی مکتوب شود.
                        </span>
                      </li>
                    </ul>
                    <p>
                      <span>سکه ی بهار آزادی =&gt; سکه بهار آزادی</span>
                    </p>
                    <p>
                      <span>سکهٔ بهار آزادی =&gt; سکه بهار آزادی</span>
                    </p>
                    <p>
                      <span>
                        (توجه: ی کسره اضافه شده در سایر کلمات، نوشته&nbsp; می
                        شود. مثلا کتابای من)
                      </span>
                    </p>
                    <ul>
                      <li>
                        <span>
                          تا جاییکه که امکانش هست و معنا بدهد کلمات دو بخشی مرکب
                          به صورت جدا نوشته شوند مثل:&nbsp;
                        </span>
                      </li>
                    </ul>
                    <p>
                      <span>دستکش دروازه بانی پسرانه</span>
                    </p>
                    <ul>
                      <li>
                        <span>
                          اعداد به صورت حروف و با املای درست نوشتاری نوشته شوند
                          :&nbsp;
                        </span>
                      </li>
                    </ul>
                    <p>
                      <span>شیش =&gt; شش</span>
                    </p>
                    <p>
                      <span>هژده =&gt; هجده</span>
                    </p>
                    <p>
                      <span>چار =&gt; چهار</span>
                    </p>
                    <ul>
                      <li>
                        <span>
                          در صورتیکه جمله یا عبارت شنیده شده ناقص است، اگر آخرین
                          کلمه تا حد خوبی ادا شده به طوری که برای شما به عنوان
                          کاربر انسانی قابل تشخیص است آن را بنویسید، وگرنه تا
                          همانجا که قابل تشخیص است نوشته شود.
                        </span>
                      </li>
                    </ul>
                    <p>
                      <span>مثلا:&nbsp;</span>
                    </p>
                    <p>
                      <span>قیمت سکه ب =&gt; قیمت سکه</span>
                    </p>
                    <p>
                      <span>قیمت سکه بها =&gt; قیمت سکه بهار</span>
                    </p>
                    <p>
                      <span>
                        قیمت سکه بهار آزاد =&gt; قیمت سکه بهار آزادی&nbsp;
                      </span>
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>نکته کمک کننده:</strong>
                    </p>
                    <p>
                      <span>
                        هر جا شک داشتید، عبارت مورد نظر را در سرچ&zwnj;باکس دیجی
                        کالا جستجو کنید و نوشتار را منطبق با نتیجه&zwnj;های
                        نمایش داده شده انجام دهید (کماکان با این شرط که فقط از
                        حروف فارسی استفاده می&zwnj;کنیم)
                      </span>
                    </p>
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
