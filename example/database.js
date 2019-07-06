"use strict"

const Contents = [
  {
    id: 'c-01',
    topics: [
      {
        id: 't1',
        part: 'p1',
        title: 'Epic songs cover from YOUTUBE',
        lessons: [
          { id: 'l1', title: 'Game of Thrones - Main Title cover by Mark Fowler', player: 'YOUTUBE', src: 'X6a9odk6b_c' },
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
    ]
  }
]

module.exports = {
  Contents: {
    find({ id }, projection, done) {
      if ({}.toString.call(projection) === '[object Function]') {
        done= projection
      }
      setTimeout(() => {
        const data = Contents.filter( _content => _content.id === id )
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
  }
}
