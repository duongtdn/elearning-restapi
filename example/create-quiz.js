"use strict"

const fs = require("fs")

createQuizzes()

function createQuizzes() {
  const quizChoice0 = createQuiz('choice-0.0', {'$1': false, '$2': true, '$3': false})
  const quizChoice1 = createQuiz('choice-0.1', {'$1': false, '$2': true, '$3': false})
  const quizText0 = createQuiz('text-0.0', {'$1': 'awesome',})
  const quizText1 = createQuiz('text-0.1' , {'$1': 'awesome',})
  const quizDragDrop0 = createQuiz('dragdrop-0.0', {
    '$1': {top: 30, left: 150},
    '$2': {top: 70, left: 150},
    '$3': {top: 110, left: 150}
  })

  const filename = {
    q0: `${__dirname}/quizzes/quiz-0.json`,
    q1: `${__dirname}/quizzes/quiz-1.json`,
    q2: `${__dirname}/quizzes/quiz-3.json`
  }

  // create quiz-0
  const quiz0 = [ quizChoice0 ]
  fs.writeFileSync(filename.q0, JSON.stringify(quiz0) ,'utf8')
  console.log(`write quizzes into ${filename.q0}`)

  // create quiz-1
  const quiz1 = [ quizText0 ]
  fs.writeFileSync(filename.q1, JSON.stringify(quiz1) ,'utf8')
  console.log(`write quizzes into ${filename.q1}`)

  // create quiz-1
  const quiz2 = [ quizChoice0, quizText0, quizChoice1, quizText1, quizDragDrop0]
  fs.writeFileSync(filename.q2, JSON.stringify(quiz2) ,'utf8')
  console.log(`write quizzes into ${filename.q2}`)

}

function createQuiz(name, answer) {
  const problem = fs.readFileSync(`${__dirname}/quizzes/${name}`, 'utf8')
  return { problem, answer }
}
