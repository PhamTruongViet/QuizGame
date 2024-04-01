import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome6";
import { questions } from "../question";
const QuizGame = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [currentColorLeft, setCurrentColorLeft] = React.useState("black");
  const [currentColorRight, setCurrentColorRight] = React.useState("black");
  const [correctAnswer, setCorrectAnswer] = React.useState<number | null>(null);
  const [wrongAnswer, setWrongAnswer] = React.useState<number | null>(null);
  const [ansCounter, setAnsConter] = React.useState(0);
  const [answered, setAnswered] = React.useState(false);
  const [count, setCount] = React.useState(10);
  const answerSelected = (index: number) => {
    if (index !== questions[currentQuestion].correctAnswer) {
      setWrongAnswer(index);
    }
    setCorrectAnswer(questions[currentQuestion].correctAnswer);
    setAnswered(true);
  };
  const prevQues = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setCorrectAnswer(null);
      setWrongAnswer(null);
      setCount(10);
    } else navigation.navigate("Home");
  };
  const [gameOver, setGameOver] = React.useState(false);

  const nextQues = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCorrectAnswer(null);
      setWrongAnswer(null);
      setCount(10);
      setAnswered(false);
    } else {
      setGameOver(true);
    }
  };

  useEffect(() => {
    if (gameOver) {
      navigation.navigate("GameOver", { ansCounter });
    }
  }, [ansCounter, gameOver]);

  useEffect(() => {
    const timer = () => {
      if (!answered) {
        if (count > 0) {
          setCount(count - 1);
        }
        if (count == 0) {
          setAnswered(true);
          answerSelected(questions[currentQuestion].correctAnswer);
        }
      }
    };
    const interval = setInterval(timer, 1000);
    return () => clearTimeout(interval);
  }, [count, answered]);

  return (
    <View style={styles.screen}>
      <View style={styles.quesContainer}>
        <View style={styles.countContainer}>
          <Text
            style={{
              justifyContent: "center",
              textAlign: "center",
              fontSize: 25,
              fontWeight: "bold",
              color: "#EEE4B1",
            }}
          >
            {count}
          </Text>
        </View>
        <Text style={styles.quesText}>
          {questions[currentQuestion].question}
        </Text>
      </View>
      <View style={styles.ansContainer}>
        {questions[currentQuestion].answers.map((item, index) => {
          let backgroundColor;
          if (index === correctAnswer) {
            backgroundColor = "#2fb42f";
          } else if (index === wrongAnswer) {
            backgroundColor = "#b42f2f";
          } else {
            backgroundColor = "#8C6A5D";
          }
          return (
            <View
              style={[
                styles.listAns,
                {
                  backgroundColor,
                },
              ]}
              key={index}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onPress={() => {
                  answerSelected(index);
                  if (index === questions[currentQuestion].correctAnswer) {
                    setAnsConter((prevAnsConter) => prevAnsConter + 1);
                  }
                }}
                disabled={answered}
              >
                <Text style={styles.ansText}>{item.answer}</Text>
                <FontAwesome name="circle-check" size={20} color="#EEE4B1" />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={prevQues}
          onPressIn={() => setCurrentColorLeft("#EEE4B1")}
          onPressOut={() => setCurrentColorLeft("black")}
        >
          <FontAwesome name="angles-left" size={20} color={currentColorLeft} />
          <Text style={styles.ansText}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={nextQues}
          onPressIn={() => setCurrentColorRight("#EEE4B1")}
          onPressOut={() => setCurrentColorRight("black")}
        >
          <Text style={styles.ansText}>Next</Text>
          <FontAwesome
            name="angles-right"
            size={20}
            color={currentColorRight}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuizGame;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    backgroundColor: "#8C6A5D",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btnContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
  },
  countContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#50323f",
    justifyContent: "center",
    borderRadius: 100,
    position: "absolute",
    top: -25,
    left: "50%",
    transform: [{ translateX: -35 }],
    paddingHorizontal: 10,
  },
  screen: {
    flex: 1,
    gap: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#421a69",
  },
  quesContainer: {
    width: "80%",
    height: 150,
    backgroundColor: "#8C6A5D",
    marginHorizontal: "10%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  ansContainer: {
    width: "80%",
    height: 220,
    // backgroundColor: "black",
    marginHorizontal: "10%",
    gap: 20,
  },
  quesText: {
    fontSize: 23,
    color: "#EEE4B1",
  },
  ansText: {
    fontSize: 17,
    color: "#EEE4B1",
  },
  listAns: {
    width: "100%",
    height: 50,
    backgroundColor: "#8C6A5D",
    justifyContent: "center",
    borderRadius: 30,
    paddingHorizontal: 10,
  },
});
