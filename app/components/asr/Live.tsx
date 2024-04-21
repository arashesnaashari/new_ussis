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
import { ToastContainer, toast } from "react-toastify";

export const Live = () => {
  const colorsOfSpeaker = [
    "#1B1A55",
    "#535C91",
    "blue",
    "#020515",
    "lightblue",
    "#0F1221",
  ];

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
  const [stateSpeaker, setStateSpeaker] = React.useState<number>(-1);
  // const [src, setText] = React.useState<string>("");

  const [textMic, setTextMic] = React.useState<string>("");
  const [link, setLink] = React.useState<any>("");
  const [linkLarge, setLinkLarge] = React.useState<any>("");
  const [fileGeneral, setFileGeneral] = React.useState<any>("");
  const [text2, setText2] = React.useState<any>([]);
  const [uniqs, setUniqs] = React.useState<any>([]);
  const [speakerCount, setSpeakerCount] = React.useState<any>("0");
  const [openmodal, setopenmodal] = React.useState<boolean>(false);

  ///////////////////// MIC THINGS ///////////////////////////////
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
        file.type == "audio/mpeg" ||
        file.type == "audio/webm" ||
        file.type == "audio/ogg" ||
        file.type == "audio/flac" ||
        file.type == "audio/x-m4a" ||
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
          if (d.detail) {
            toast.warning(d.detail, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              // transition: Slide,
            });
          }
          // console.log(openmodal);

          // if (d.message.length > 1 && openmodal) {
          //   // handleSearch(d.messag;
          //   // alert("new tab");
          // }
          setopenmodal(false);

          // location.reload();
        })
        .catch((err) => {
          //setLoading(false), setopenmodal(false)
          console.log(err);
        });
    }
  };
  ///////////////////MIC THINGS ////////////////////////////////////////
  // ##2 large file
  const handleUploadFile = () => {
    console.log("uploadFile");

    const input = document.getElementById("upload");
    let file = new File([input?.files[0]], `filename.${input?.files[0].type}`, {
      type: input?.files[0].type,
    });
    var fd = new FormData();
    fd.append("file", file);
    console.log(file.type);

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
    if (confirm("ارسال فایل انجام شود ؟")) {
      if (
        file.size < 10000000 &&
        (file.type == "audio/wav" ||
          file.type == "audio/mp3" ||
          file.type == "audio/mpeg" ||
          file.type == "audio/webm" ||
          file.type == "audio/ogg" ||
          file.type == "audio/flac" ||
          file.type == "audio/x-m4a" ||
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
            if (d.detail) {
              toast.warning(d.detail, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                // transition: Slide,
              });
              // alert(d.detail);
            }

            // document.body.querySelector(".playme_large")?.appendChild(audio);
          })
          .catch((err) => {
            //, setLoading2(false), setopenmodal(false);
            console.log("Catch error");

            console.log(err), setLoading2(false);
          });
      } else {
        toast.error("فرمت یا حجم فایل با فیلتر های سمت ما مغایرت دارد", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Slide,
        });
        setLoading2(false);
      }
    } else {
      setLoading2(false);
    }
  };
  // ##3 speaker dizartion
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
    console.log("speakerCount");
    console.log(speakerCount);
    console.log("cc");
    console.log(cc);

    fd.append("num_speakers", `${cc == "0" ? speakerCount : cc}`);
    setLoading2(true);
    console.log("DDDD");

    console.log(file.type);

    if (!file) {
      toast.warning("فایل رو آپلود کنید", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Slide,
      });
      setLoading2(false);
    } else if (!confirm("ارسال فایل انجام شود ؟")) {
      setLoading2(false);
    } else if (
      file.size < 10000000 &&
      (file.type == "audio/wav" ||
        file.type == "audio/mp3" ||
        file.type == "audio/mpeg" ||
        file.type == "audio/webm" ||
        file.type == "audio/ogg" ||
        file.type == "audio/flac" ||
        file.type == "audio/x-m4a" ||
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
          if (d.detail) {
            setLoading2(false);
          } else {
            // var x = xx;
            setLink(d.download_id);
            var x = d.speakers;
            setText2(d.speakers);
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
          }
        })
        .catch((err) => {
          //, setLoading(false), setopenmodal(false);
          console.log(err), setLoading2(false);
        });
    } else {
      toast.error("فرمت یا حجم فایل با فیلتر های سمت ما مغایرت دارد", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Slide,
      });
      // alert("فرمت یا حجم فایل با فیلتر های سمت ما مغایرت دارد");
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
  //test file
  const handleTestSample = (type: string) => {
    const dataSpeaker = [
      {
        text_chunk:
          "محدوده های به تهران الحاق باشه  که جمعیتی که توی مناطق پر تراکم هستند  بتونن خونه ی خودشون رو واگذار کنم مثلا به  شهرداری یا دولت و در مقابل زمینی در محدوده های اطراف شهر تهران بگیرم این قابل تامل میشه چون ما تو شهر تهران مشکل رانه خدمات داریم مشکل تراکم جمعیتی داریم مشکل ترافیک داریم مشکل ازدحام و فشار محیط زیستی و این را داریم شاید بشه از این طریق یه حدی از این تمرکز جمعیتی که توی شهر تهران هست کم کرد متالم باید توی چارچوب ی ضوابط روشنی باشه که به زمین خالی و سوداگری منجر نشه آقای",
        start: 0.58,
        end: 1.84,
        speaker: 2,
      },
      {
        text_chunk:
          "نامهای شکوهی یک سری از نقاط و دایره های مشترک بین توسعه افقی که بتونن ازش دفاع کنم مطرح کردن  اما وقتی که بررسی می کنیم که اتفاقا نقاط  قابل توجهی هم هست و میشه در قالب اون ها از این نگاه حمایت  کرد ولی وقتی نگاه می کنیم می بینیم که  در سال های گذشته هیچ کدوم از این الگو هایی که در قالب توسعه افقی شهر ها اجرایی شده حداقل در ایران موفق نبودند یعنی المان هایی که آقای  شکوهی دارن در مورد صحبت می کنند در قالب این توسعه ها دیده نشده  ضمن این که می بینیم که علاوه بر این که مثلا توسعه افقی شهرها به نابودی مثلا زمین های کشاورزی منجر شده اتفاق در بلند مدت هزینه اداره شهر را هم گسترش داد این در حالی که توسعه عمودی چنین چیزایی رو نداره هزینه های حمل و نقل هزینه های زیرساختی رو کاهش میده  شما تا چقدر با این ",
        start: 36.8,
        end: 40.02,
        speaker: 0,
      },
      {
        text_chunk:
          "موتومه الرحمن الرحیم سلام عرض می کنم خدمت  شما و آقای دکتر شکوهی  ببین این بحث باید دقیقا برین که ما چقدر نیاز  داریم و اون نیاز رو چه جوری می خواهیم تمرین کنیم  بحث این که توسعه افقی تو خیلی از شهر هایی را ما هزار و چهارصد و چهل تا شهر داریم تو شهرای کوچیک و متوسط و میانی ما  همون خونه های یک و دو طبقه  جوابگو توسعه و البته نیازی هم به الحاق نیست یعنی این تصور که ما حتما باید الحاق پی بکنیم حتما باید توسعه اراضی جدید داشته باشیم به نظر من  در خیلی از مفروضات مطالعات ما نشون میده که این ضرورت نیست  ما گستره اراضی بایر قابل توجهی داریم ولی قوانین بازدارنده سوداگری خیلی کمی تو این حوزه داریم ما بسیاری از اراضی مازاد  دستگاه ها و نهاد ها داریم  که بهترین اراضی هست برای استفاده از زیرساخت ها شون  اولویت اون هاست چیزی که در قانون جهش تولید مسکن بوده ارزوی مازاد دستگاه ها  زمین های درون شهری بافت  و پیشنهادت دیگه ای که ما برای اون داریم  به طور خاص در کلان شهرها ولی اساسا ما الحاق رو  در تهران در مشهد اصفهان حالا ممکنه یک کیس خیلی خاصی پیش بیاد انجام بشه  ولی به عنوان یک روی کرد نه ما  اول ما که به عنوان مرکز پژوهش ها صحبت می کنم سیاست های کلی رو ",
        start: 88.74,
        end: 90.52,
        speaker: 1,
      },
      {
        text_chunk: "دنبال درست نمی دونی در قالب ",
        start: 163.06,
        end: 164.36,
        speaker: 0,
      },
      {
        text_chunk:
          "لاینی وقتی که شما در کلان شهر ما طبق تمام اسناد مون باید تمرکز زدایی بکنیم طبق بحث آمایش سرزمین مون  هم توسعه جمعیت پذیریشان باید محدود بشه جمعیت یه رشد طبیعی داریم یه رشد مهاجرت داریم ما اگر آمایش سرزمین که اشاره شد ",
        start: 164.54,
        end: 169.98,
        speaker: 1,
      },
    ];
    const excel = "2c61fcc8-e408-4a55-a8de-90ca87f5ae7e.csv";
    const txt = "35ca296f-29d7-49ff-be01-3e7857b6ab2f.txt";
    const dataLarge =
      " محدوده های به تهران الحاق باشه که جمعیتی که توی مناطق پر تراکم هستند بتونن خونه ی خودشون رو واگذار کنم مثلا به شهرداری یا دولت و در مقابل زمینی در محدوده های اطراف شهر تهران بگیرم این قابل تامل میشه چون ما تو شهر تهران مشکل رانه خدمات داریم مشکل تراکم جمعیتی داریم مشکل ترافیک داریم مشکل ازدحام و فشار محیط زیستی و این را داریم شاید بشه از این طریق یه حدی از این تمرکز جمعیتی که توی شهر تهران هست کم کرد متالم باید توی چارچوب ی ضوابط روشنی باشه که به زمین خالی و سوداگری منجر نشه آقای نامهای شکوهی یک سری از نقاط و دایره های مشترک بین توسعه افقی که بتونن ازش دفاع کنم مطرح کردن اما وقتی که بررسی می کنیم که اتفاقا نقاط قابل توجهی هم هست و میشه در قالب اون ها از این نگاه حمایت کرد ولی وقتی نگاه می کنیم می بینیم که در سال های گذشته هیچ کدوم از این الگو هایی که در قالب توسعه افقی شهر ها اجرایی شده حداقل در ایران موفق نبودند یعنی المان هایی که آقای شکوهی دارن در مورد صحبت می کنند در قالب این توسعه ها دیده نشده ضمن این که می بینیم که علاوه بر این که مثلا توسعه افقی شهرها به نابودی مثلا زمین های کشاورزی منجر شده اتفاق در بلند مدت هزینه اداره شهر را هم گسترش داد این در حالی که توسعه عمودی چنین چیزایی رو نداره هزینه های حمل و نقل هزینه های زیرساختی رو کاهش میده شما تا چقدر با این موتومه الرحمن الرحیم سلام عرض می کنم خدمت شما و آقای دکتر شکوهی ببین این بحث باید دقیقا برین که ما چقدر نیاز داریم و اون نیاز رو چه جوری می خواهیم تمرین کنیم بحث این که توسعه افقی تو خیلی از شهر هایی را ما هزار و چهارصد و چهل تا شهر داریم تو شهرای کوچیک و متوسط و میانی ما همون خونه های یک و دو طبقه جوابگو توسعه و البته نیازی هم به الحاق نیست یعنی این تصور که ما حتما باید الحاق پی بکنیم حتما باید توسعه اراضی جدید داشته باشیم به نظر من در خیلی از مفروضات مطالعات ما نشون میده که این ضرورت نیست ما گستره اراضی بایر قابل توجهی داریم ولی قوانین بازدارنده سوداگری خیلی کمی تو این حوزه داریم ما بسیاری از اراضی مازاد دستگاه ها و نهاد ها داریم که بهترین اراضی هست برای استفاده از زیرساخت ها شون اولویت اون هاست چیزی که در قانون جهش تولید مسکن بوده ارزوی مازاد دستگاه ها زمین های درون شهری بافت و پیشنهادت دیگه ای که ما برای اون داریم به طور خاص در کلان شهرها ولی اساسا ما الحاق رو در تهران در مشهد اصفهان حالا ممکنه یک کیس خیلی خاصی پیش بیاد انجام بشه ولی به عنوان یک روی کرد نه ما اول ما که به عنوان مرکز پژوهش ها صحبت می کنم سیاست های کلی رو دنبال درست نمی دونی در قالب لاینی وقتی که شما در کلان شهر ما طبق تمام اسناد مون باید تمرکز زدایی بکنیم طبق بحث آمایش سرزمین مون هم توسعه جمعیت پذیریشان باید محدود بشه جمعیت یه رشد طبیعی داریم یه رشد مهاجرت داریم ما اگر آمایش سرزمین که اشاره شد";
    if (type == "large") {
      setText(dataLarge);
      setLinkLarge(txt);
      setValue(dataLarge);

      const audio = document.createElement("audio");
      audio.src = "/3speaker.mp3";
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
      audio.src = "/3speaker.mp3";
      audio.style.filter = "opacity(0.5)";
      audio.controls = true;
      let myNode = document.body.querySelector(".playme_reco");
      while (myNode?.firstChild) {
        myNode.removeChild(myNode?.lastChild);
      }

      document.body.querySelector(".playme_reco")?.appendChild(audio);
    }
  };
  //when change count of speaker
  const handleCountSpeaker = (e: any) => {
    console.log(e);

    setSpeakerCount(e);
    handleUploadFileReco(false, e);
  };

  return (
    <>
      <ToastContainer />
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
        pb={{ "2xl": "10rem" }}
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
                    <Box
                      display={"flex"}
                      flexFlow={"column"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Box
                        width={"100%"}
                        display={"flex"}
                        flexFlow={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        {" "}
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
                      </Box>
                      <Box
                        width={"100%"}
                        display={"flex"}
                        flexFlow={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        mt={"1rem"}
                      >
                        <Text fontFamily={"vazir"} color={"white"}>
                          برای ضبط صدا روی میکروفون کلیک کنید
                        </Text>
                      </Box>
                    </Box>
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
                            onChange={() => handleUploadFileReco(true, "0")}
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
                            id="option"
                            style={{
                              color: "black",
                              backgroundColor: "gray",
                              fontFamily: "yekan",
                              fontSize: "12px",
                            }}
                            value="0"
                          >
                            نامشخص
                          </option>
                          <option
                            id="option"
                            style={{
                              color: "black",
                              backgroundColor: "gray",
                              fontFamily: "yekan",
                              fontSize: "12px",
                            }}
                            value="1"
                          >
                            ۱
                          </option>
                          <option
                            style={{
                              color: "black",
                              backgroundColor: "gray",
                              fontFamily: "yekan",
                              fontSize: "12px",
                            }}
                            value="2"
                          >
                            ۲
                          </option>
                          <option
                            style={{
                              color: "black",
                              backgroundColor: "gray",
                              fontFamily: "yekan",
                              fontSize: "12px",
                            }}
                            value="3"
                          >
                            ۳
                          </option>
                          <option
                            style={{
                              color: "black",
                              backgroundColor: "gray",
                              fontFamily: "yekan",
                              fontSize: "12px",
                            }}
                            value="4"
                          >
                            ۴
                          </option>
                          <option
                            style={{
                              color: "black",
                              backgroundColor: "gray",
                              fontFamily: "yekan",
                              fontSize: "12px",
                            }}
                            value="5"
                          >
                            ۵
                          </option>
                        </Select>
                        <label
                          htmlFor="cars"
                          style={{
                            color: "white",
                            fontSize: "15px",
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
                "#option:hover": {
                  background: "red",
                },
                "#option": {
                  background: "green",
                },
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
                          cursor={"pointer"}
                          onMouseEnter={() => setStateSpeaker(e)}
                          onMouseLeave={() => setStateSpeaker(-1)}
                          onTouchStart={() => setStateSpeaker(e)}
                          onTouchCancel={() => setStateSpeaker(-1)}
                          color={"white"}
                          borderRadius={"md"}
                          mr={"7px"}
                          px={"7px"}
                          py={"7px"}
                          fontSize={"12px"}
                          fontFamily={"vazir"}
                          bgColor={
                            e == 0
                              ? "#1B1A55"
                              : e == 1
                              ? "#535C91"
                              : e == 2
                              ? "blue"
                              : e == 3
                              ? "#0F1221"
                              : e == 4
                              ? "lightblue"
                              : "#020515"
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
                    height={"max-content"}
                    overflowY={"scroll"}
                    color="white"
                    my={"2rem"}
                    borderRadius={"0"}
                    borderBottom={"1px solid rgba(255, 255, 255, 0.15)"}
                  >
                    {/* {text2} */}
                    {text2.map((e: any) => (
                      <>
                        {stateSpeaker !== -1 ? (
                          <Box
                            mx={"1rem"}
                            fontFamily={"vazir"}
                            color={"white"}
                            my={"10px"}
                            bgColor={
                              e.speaker == stateSpeaker
                                ? colorsOfSpeaker[stateSpeaker]
                                : "transparent"
                            }
                          >
                            {e.text_chunk}
                          </Box>
                        ) : (
                          <Box
                            mx={"1rem"}
                            fontFamily={"vazir"}
                            color={"white"}
                            my={"10px"}
                            bgColor={
                              e.speaker == 0
                                ? "#1B1A55"
                                : e.speaker == 1
                                ? "#535C91"
                                : e.speaker == 2
                                ? "blue"
                                : e.speaker == 3
                                ? "#0F1221"
                                : e.speaker == 4
                                ? "lightblue"
                                : "#020515"
                            }
                          >
                            {e.text_chunk}
                          </Box>
                        )}
                      </>
                    ))}
                  </Box>
                </>
              ) : tab == "large" ? (
                <>
                  <Textarea
                    fontFamily={"vazir"}
                    // isReadOnly
                    onChange={(e) => setText(e.target.value)}
                    style={{ direction: "rtl" }}
                    border={"none"}
                    rows={8}
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
                    // isReadOnly
                    onChange={(e) => setTextMic(e.target.value)}
                    style={{ direction: "rtl" }}
                    border={"none"}
                    rows={8}
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
