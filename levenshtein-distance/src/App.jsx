import { useState } from "react"
import Changes from "./components/Changes"
import Controls from "./components/Controls"
import Footer from "./components/Footer"
import GetWords from "./components/GetWords"
import Graph from "./components/Graph"
import Header from "./components/Header"

function App() {
  const [graph, setGraph] = useState([])
  const [classGraph, setClassGraph] = useState([])
  const [correctWord, setCorrectWord] = useState("")
  const [wrongWord, setWrongWord] = useState("")
  const [wordsReady, setWordsReady] = useState(false)
  const [rowStep, setRowStep] = useState(2)
  const [colStep, setColStep] = useState(2)
  const [completeMatrix, setCompleteMatrix] = useState(false)
  const [changes, setChanges] = useState([])

  const resetClassGraph = () => {
    let tempClassGraph = [...classGraph]
    for (let i = 2; i < classGraph.length; i++) {
      for (let j = 2; j < classGraph.length; j++) tempClassGraph[i][j] = ""
    }
    setClassGraph([...tempClassGraph])
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const tracePath = async (delayMS) => {
    let tempClassGraph = [...classGraph]

    let yCoord = classGraph.length - 1
    let xCoord = classGraph[0].length - 1
    tempClassGraph[yCoord][xCoord] = "answer"
    setClassGraph([...tempClassGraph])

    while (xCoord != 1 && yCoord != 1) {
      const topValue = graph[yCoord - 1][xCoord]
      const leftValue = graph[yCoord][xCoord - 1]
      const diagValue = graph[yCoord - 1][xCoord - 1]

      if (diagValue <= topValue && diagValue <= leftValue) {
        yCoord-- // diag value is minimum
        xCoord--
      } else if (topValue < diagValue && topValue < leftValue) {
        yCoord-- // top value is minimum
      } else {
        xCoord-- // left value is minimum
      }

      tempClassGraph[yCoord][xCoord] = "path" // change color

      setClassGraph([...tempClassGraph])
      await sleep(delayMS)
    }

    console.log("Path complete")
  }

  const solveNextDiagonal = () => {
    let tempGraph = [...graph]

    const topLeft =
      tempGraph[rowStep][0] == tempGraph[0][colStep]
        ? tempGraph[rowStep - 1][colStep - 1]
        : tempGraph[rowStep - 1][colStep - 1] + 1
    const top = tempGraph[rowStep - 1][colStep] + 1
    const left = tempGraph[rowStep][colStep - 1] + 1
    tempGraph[rowStep][colStep] = Math.min(top, left, topLeft)

    if (colStep == tempGraph[0].length - 1 && rowStep != tempGraph.length - 1) {
      setColStep(2)
      setRowStep((curr) => curr + 1)
    } else if (
      colStep == tempGraph[0].length - 1 &&
      rowStep == tempGraph.length - 1
    ) {
      setCompleteMatrix(true)
      tracePath(100)
      return
    } else {
      setColStep((curr) => curr + 1)
    }

    setGraph([...tempGraph])
  }

  const solveMatrix = async () => {
    setCompleteMatrix(true)
    let tempGraph = [...graph]

    for (let i = 2; i < graph.length; i++) {
      for (let j = 2; j < graph[0].length; j++) {
        const topLeft =
          tempGraph[i][0] == tempGraph[0][j]
            ? tempGraph[i - 1][j - 1]
            : tempGraph[i - 1][j - 1] + 1
        const top = tempGraph[i - 1][j] + 1
        const left = tempGraph[i][j - 1] + 1
        tempGraph[i][j] = Math.min(top, left, topLeft)
        setGraph([...tempGraph])
        await sleep(20)
      }
    }
    tracePath(100)
  }

  return (
    <main className="min-w-full mx-auto bg-slate-800 min-h-screen px-32 py-6">
      <Header />
      {wordsReady ? (
        <div className="flex flex-col min-w-full mx-auto items-center">
          <Graph
            graph={graph}
            setGraph={setGraph}
            wrongWord={wrongWord}
            correctWord={correctWord}
            classGraph={classGraph}
            setClassGraph={setClassGraph}
          />
          <Controls
            solveNextDiagonal={solveNextDiagonal}
            solveMatrix={solveMatrix}
            completeMatrix={completeMatrix}
          />
          <Changes changes={changes} />
        </div>
      ) : (
        <GetWords
          setCorrectWord={setCorrectWord}
          setWrongWord={setWrongWord}
          setWordsReady={setWordsReady}
          correctWord={correctWord}
          wrongWord={wrongWord}
        />
      )}
      <Footer />
    </main>
  )
}

export default App
