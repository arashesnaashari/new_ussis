import * as React from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { useIsMobile } from "../hooks";

import type { MetaFunction } from "@remix-run/node";
import {
  Table,
  Tr,
  Th,
  Td,
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
  Textarea,
} from "@chakra-ui/react";
import { Hero } from "../components/asr/Hero";
import { Feature } from "../components/asr/Feature";
import { Pricing } from "../components/asr/Pricing";
import { Header } from "~/components/asr/Header";
import { Live } from "~/components/asr/Live";
export const meta: MetaFunction = () => {
  return [{ title: "Usisstant" }, { name: "ASR", content: "!" }];
};

export default function App() {
  const isMobile = useIsMobile();
  return (
    <Box maxW={"2000px"} mx={"auto"}>
      {/* modal */} {/* Header */}
      <Header />
      {/* Container */}
      <Hero />
      {/* Feature */} {/* keys */}
      <Feature />
      {/* live demo */}
      {/* <Box
        id="test"
        bgColor={"rgba(217, 217, 217, 0.06)"}
        width={"100%"}
        py={"25rem"}
      >
        <Box
          textAlign={"center"}
          color={"white"}
          fontSize={"32px"}
          fontWeight={"bold"}
          fontFamily={"yekan"}
        >
          Live Demo .. !
        </Box>
      </Box> */}
      <Live />
      {/* Pricing */} {/* About */}
      <Pricing />
    </Box>
  );
}
