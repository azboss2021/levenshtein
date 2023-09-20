import { useEffect } from "react"

const Graph = ({
  graph,
  setGraph,
  classGraph,
  setClassGraph,
  correctWord,
  wrongWord,
}) => {
  useEffect(() => {
    generateGraph()
  }, [])

  const generateGraph = () => {
    let tempGraph
    let tempClassGraph
    const tempGraphRows = wrongWord.length + 2
    const tempGraphCols = correctWord.length + 2

    tempGraph = new Array(tempGraphRows)
    tempClassGraph = new Array(tempGraphRows)

    for (let i = 0; i < tempGraph.length; i++) {
      tempGraph[i] = new Array(tempGraphCols)
    }
    for (let i = 0; i < tempClassGraph.length; i++) {
      tempClassGraph[i] = new Array(tempGraphCols)
    }

    for (let i = 0; i < tempGraph.length; i++) {
      for (let j = 0; j < tempGraph[0].length; j++) {
        tempClassGraph[i][j] = ""
      }
    }

    for (let i = 0; i < tempGraph.length; i++) {
      for (let j = 0; j < tempGraph[0].length; j++) {
        if (j == 0 && i > 1) {
          tempGraph[i][j] = wrongWord[i - 2]
          tempClassGraph[i][j] = "word"
        } else if (j == 1 && i > 1) tempGraph[i][j] = i - 1
        else if (j > 1 && i == 1) tempGraph[i][j] = j - 1
        else if (j > 1 && i == 0) {
          tempGraph[i][j] = correctWord[j - 2]
          tempClassGraph[i][j] = "word"
        } else if (j == 0 && i == 0) tempGraph[i][j] = "empty"
        else if (j == 0 && i == 1) tempGraph[i][j] = "empty"
        else if (j == 1 && i == 0) tempGraph[i][j] = "empty"
        else if (j == 1 && i == 1) tempGraph[i][j] = 0
        else tempGraph[i][j] = null
      }
    }

    setGraph([...tempGraph])
    setClassGraph([...tempClassGraph])
  }

  const getGraphClass = (row, col, val) => {
    switch (classGraph[row][col]) {
      case "answer":
        return (
          <div
            key={"col_" + col}
            className="font-bold border-2 flex justify-center  w-12 h-12 items-center p-2 matrix-item border-zinc-500 text-xl bg-blue-600 dark:text-zinc-200 transition-all"
          >
            {val}
          </div>
        )
      case "path":
        return (
          <div
            key={"col_" + col}
            className="border-2 flex justify-center  w-12 h-12  items-center p-2 matrix-item border-zinc-500 bg-red-500 text-xl dark:text-zinc-200 transition-all"
          >
            {val}
          </div>
        )
      case "word":
        return (
          <div
            key={"col_" + col}
            className="border-2 flex  w-12 h-12  justify-center items-center p-2 matrix-item border-zinc-500 font-bold uppercase text-xl dark:text-zinc-100 transition-all"
          >
            {val}
          </div>
        )
      default:
        return (
          <div
            key={"col_" + col}
            className="border-2 flex w-12 h-12  justify-center items-center p-2 matrix-item border-zinc-500 dark:text-zinc-200 text-xl transition-all"
          >
            {val}
          </div>
        )
    }
  }

  const updatedGraph = graph.map((row, rowIndex) => {
    return (
      <div key={"row_" + rowIndex} className="flex w-full">
        {row.map((val, valIndex) =>
          val === "empty" ? (
            <div
              key={"col_" + valIndex}
              className="p-2 flex-1 flex matrix-item"
            ></div>
          ) : (
            getGraphClass(rowIndex, valIndex, val)
          )
        )}
      </div>
    )
  })

  return (
    <section className="mb-4">
      <div className="flex flex-col min-w-full">{updatedGraph}</div>
    </section>
  )
}

export default Graph
