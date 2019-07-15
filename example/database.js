"use strict"

const Content = [
  {
    id: 'c-01',
    topics: [
      {
        id: 't1',
        part: 'p1',
        title: 'Epic songs cover from YOUTUBE',
        lessons: [
          {
            id: 'q1', title: 'QUIZ - Example 1', player: 'QUIZ', src: 'quiz-0.json',
            // id: 'l1', title: 'Game of Thrones - Main Title cover by Mark Fowler', player: 'YOUTUBE', src: 'X6a9odk6b_c',
            subLessons: [
              {id: '0', player: 'YOUTUBE', src: 'YHjA7nR1yYo', skip: 1},
              {id: '1', player: 'YOUTUBE', src: 'hKRUPYrAQoE'},
              {id: '2', player: 'QUIZ', src: 'quiz-1.json', },
              {id: '3', player: 'YOUTUBE', src: 'rZqJBjTP7Xk', skip: 1},
              {id: '4', player: 'YOUTUBE', src: 'qwJj2EpC8vg'},
            ]
          },
          { id: 'q2', title: 'QUIZ - Example 2', player: 'QUIZ', src: 'quiz-3.json', },
          { id: 'l2', title: 'The Lord of The Rings - Piano cover by Mark Fowler', player: 'YOUTUBE', src: 'VsjzB7GRZeA' },
          { id: 'l3', title: 'The Lord of The Rings - Cover by Linsay Stirling', player: 'YOUTUBE', src: 'dQiNVk_u0po' },
          { id: 'l4', title: 'The Elder Scrolls: Skyrim - Piano cover by Mark Fowler', player: 'YOUTUBE', src: 'no3B0uS6nLk' },
          { id: 'l5', title: 'The Elder Scrolls: Skyrim Dragonborn - Piano cover by Mark Fowler', player: 'YOUTUBE', src: 'XQMnT9baoi8' },
          { id: 'l6', title: 'The Elder Scrolls: Skyrim Age of Aggression - Cover by Malukah', player: 'YOUTUBE', src: 'KNDT7EInclo' },
        ]
      },
      {
        id: 't2',
        part: 'p1',
        title: 'Japanese songs from anime',
        lessons: [
          { id: 'l1', title: 'Hotarubi No Mori E', player: 'YOUTUBE', src: '5Y0LhI4pkas' },
          { id: 'l2', title: 'Sadness and Sorrow -Cover by Taylor Davis', player: 'YOUTUBE', src: 'mF3DCa4TbD0' },
          { id: 'l3', title: 'Hokage funeral', player: 'YOUTUBE', src: 'OJ4adTsgAPk' },
        ]
      },
      {
        id: 't3',
        part: 'p2',
        title: 'Most favirote song from the album',
        lessons: [
          { id: 'l1', title: 'Victory', player: 'YOUTUBE', src: 'hKRUPYrAQoE' },
          { id: 'l2', title: 'Strength of a Thousand Men', player: 'YOUTUBE', src: 'qwJj2EpC8vg' },
          { id: 'l3', title: 'Protectors of the Earth', player: 'YOUTUBE', src: 'ASj81daun5Q' },
          { id: 'l4', title: 'Merchant Prince', player: 'YOUTUBE', src: 'nziL13HF2DA' },
          { id: 'l5', title: 'Star Sky', player: 'YOUTUBE', src: 'DUZCedq9a4Q' },
        ]
      },
    ],
    parts: [
      { id: 'p1', title: 'Cover Songs'},
      { id: 'p2', title: 'Two steps from hell'},
    ],
    note: '<p>Thank you for chosing our service and Welcome to class <span class="bold italic"> Basic C for Embedded </span>.<br /> \
          During this class, you will learn about C programming Language and apply it to embedded project based on Arduino board. \
          For study efficiency, we recommend you to look at the note after each lesson, and also practice with our quizzes.<br /> \
          At the end, you can take an exam. Passing this exam will certify your C and Arduino skills at Novice level. \
          <p class="w3-right">Yours Sincerely,<br />Instructor</p>',
    materials: [
      { title: 'Embedded Text Book. Second Edition', url: '', downloadable: false },
      { title: 'GNU Compiler for C', url: '', downloadable: false },
      { title: 'Course handout - Practice C Problems and Answers 1', url: '', downloadable: true },
      { title: 'Course handout - Practice C Problems and Answers 2', url: '', downloadable: true },
      { title: 'Course handout - Practice C Problems and Answers 3', url: '', downloadable: true },
    ]
  }
]

const Progress = [
  // {
  //   uid: '4fc9d440-8f7a-11e9-95d5-315e185d3a06',
  //   id: 'c-01',
  //   progress: {
  //     't1': { 'l1': true }
  //   }
  // }
]

const Enroll = [
  {
    courseId: 'c-01',
    enrolledTo: '4fc9d440-8f7a-11e9-95d5-315e185d3a06',
    enrolledAt: new Date(),
    status: 'activated',
    activatedBy: 'system-automation',
    invoice: 'iv-001',
    comments: [
      { by: 'system', message: 'automatic enroll'}
    ],
    tests: [
      {
        testId: 'test-01',
        resultId: 'r-test-01',
        title: 'Mid-term Exam',
        description: 'Mid-term Test for course Embedded - 01',
        result: {
          score: 92,
          status: 'passed'
        },
        passScore: 70
      },
      {
        testId: 'test-02',
        resultId: 'r-test-02',
        title: 'Final Exam',
        description: 'Final Test for course Embedded - 01',
        passScore: 70
      }
    ]
  }
]

module.exports = {
  Content: {
    find({ id }, projection, done) {
      if ({}.toString.call(projection) === '[object Function]') {
        done= projection
      }
      setTimeout(() => {
        const data = Content.filter( _content => _content.id === id )
        if (data.length > 0) {
          let content = {}
          if ({}.toString.call(projection) === '[object Array]') {
            projection.forEach( prop => {
              const p = prop.split(".")
              if (p.length === 1) {
                const k = p[0]
                content[k] = data[0][k]
              } else {
                const k = p[0]
                const l = p[1]
                if (!content[k]) { content[k] = {} }
                content[k][l] = data[0][k][l]
              }
            })
          } else {
            content = {...data[0]}
          }
          done && done([content])
        } else {
          done && done([])
        }
      }, 500)
      return this
    },
  },
  Progress: {
    find({uid, id}, projection, done) {
      if ({}.toString.call(projection) === '[object Function]') {
        done= projection
      }
      setTimeout(() => {
        const data =  Progress.filter( progress => progress.uid === uid && progress.id === id )
        const res = data.map(item => { if (item && item.progress) { return {id: item.id, progress: item.progress} } })  // not return uid to client
        done && done(res)
      }, 500)
    },
    update({uid, id, progress}, done) {
      setTimeout(() => {
        const doc= Progress.find(p => p.id === id && p.uid === uid) || { uid, id, progress: {} }
        for (let t in progress) {
          const topic = progress[t]
          doc.progress[t] = {...doc.progress[t], ...topic}
        }
        if (!(Progress.find( p => p.id === id && p.uid === uid))) {
          Progress.push(doc)
        }
        done && done(null)
      }, 500)
    }
  },
  Enroll: {
    find({courseId, enrolledTo}, projection, done) {
      if ({}.toString.call(projection) === '[object Function]') {
        done= projection
      }
      setTimeout(() => {
        const data =  Enroll.filter( enroll => enroll.courseId === courseId && enroll.enrolledTo === enrolledTo )
        if (data.length > 0) {
          let res = {}
          if ({}.toString.call(projection) === '[object Array]') {
            projection.forEach( prop => {
              res[prop] = data[0][prop]
            })
          } else {
            res = {...data[0]}
          }
          done && done([res])
        } else {
          done && done([])
        }
      }, 500)
    }
  }
}
