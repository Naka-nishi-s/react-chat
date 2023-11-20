import { keyframes } from "@emotion/react";
import { Avatar, Box, Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Container, Engine, ISourceOptions } from "tsparticles-engine";

const particlesInit = async (main: Engine) => {
  await loadFull(main);
};

const particlesLoaded = async (container?: Container): Promise<void> => {
  console.log(container);
};

type Message = {
  sender: "bot" | "user";
  text: string;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Chat = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const questions: string[] = ["ユーザー名は？", "パスワードは？"];

  useEffect(() => {
    if (currentStep < questions.length) {
      setTimeout(() => {
        setChatHistory((chatHistory) => [
          ...chatHistory,
          { sender: "bot", text: questions[currentStep] },
        ]);
      }, 500); // 500ミリ秒の遅延
    }
  }, [currentStep]);

  const handleSend = () => {
    setChatHistory((chatHistory) => [
      ...chatHistory,
      { sender: "user", text: input },
    ]);
    setInput("");

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("会話終了");
    }
  };

  const options: ISourceOptions = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 5,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
  };

  return (
    <Box sx={{ p: 2 }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={options}
      />

      {chatHistory.map((message, index) => (
        <Grid
          container
          key={index}
          justifyContent={message.sender === "user" ? "flex-end" : "flex-start"}
        >
          <Grid item>
            {message.sender === "bot" && (
              <Avatar alt="Bot" src="/bot-icon.png" />
            )}
            <Box
              sx={{
                margin: 1,
                padding: 1,
                border: "1px solid grey",
                borderRadius: "10px",
                animation: `${fadeIn} 0.5s ease`,
              }}
            >
              <p>{message.text}</p>
            </Box>
            {message.sender === "user" && (
              <Avatar alt="User" src="/user-icon.png" />
            )}
          </Grid>
        </Grid>
      ))}
      <Grid container spacing={1}>
        <Grid item xs>
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={currentStep >= questions.length}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleSend}
            disabled={currentStep >= questions.length}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
