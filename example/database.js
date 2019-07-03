"use strict"

const Contents = [
  {
    id: 'c-01',
    topics: [
      {
        part: 'p1',
        title: 'Epic songs cover from Youtube',
        lessons: [
          { title: 'Game of Thrones - Main Title cover by Mark Fowler', player: 'youtube', uri: 'X6a9odk6b_c' },
          { title: 'The Lord of The Rings - Piano cover by Mark Fowler', player: 'youtube', uri: 'VsjzB7GRZeA' },
          { title: 'The Lord of The Rings - Cover by Linsay Stirling', player: 'youtube', uri: 'dQiNVk_u0po' },
          { title: 'The Elder Scrolls: Skyrim - Piano cover by Mark Fowler', player: 'youtube', uri: 'no3B0uS6nLk' },
          { title: 'The Elder Scrolls: Skyrim Dragonborn - Piano cover by Mark Fowler', player: 'youtube', uri: 'XQMnT9baoi8' },
          { title: 'The Elder Scrolls: Skyrim Age of Aggression - Cover by Malukah', player: 'youtube', uri: 'XQMnT9baoi8' },
        ]
      },
      {
        part: 'p1',
        title: 'Japanese songs from anime',
        lessons: [
          { title: 'Hotarubi No Mori E', player: 'youtube', uri: '5Y0LhI4pkas' },
          { title: 'Sadness and Sorrow -Cover by Taylor Davis', player: 'youtube', uri: 'mF3DCa4TbD0' },
          { title: 'Hokage funeral', player: 'youtube', uri: 'OJ4adTsgAPk' },
        ]
      },
      {
        part: 'p2',
        title: 'Most favirote song from the album',
        lessons: [
          { title: 'Victory', player: 'youtube', uri: 'hKRUPYrAQoE' },
          { title: 'Strength of a Thousand Men', player: 'youtube', uri: 'qwJj2EpC8vg' },
          { title: 'Protectors of the Earth', player: 'youtube', uri: 'ASj81daun5Q' },
          { title: 'Merchant Prince', player: 'youtube', uri: 'nziL13HF2DA' },
          { title: 'Star Sky', player: 'youtube', uri: 'DUZCedq9a4Q' },
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
