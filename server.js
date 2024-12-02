// import { createServer } from 'node:http'
// // const http = require('node:http')

// const server = createServer((request, response) => {
//     console.log('log: oi');
//     response.write('Hello Word')
//     return response.end()
// })
// server.listen(3333)



import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()

const database = new DatabaseMemory

// request === body
// response === reply
server.post('/videos', (request, reply) => {
    const { title, description, duration } = request.body

    database.create({
        title,
        description,
        duration,
    })
    
    return reply.status(201).send()
})


server.get('/videos', (request) => {
    const search = request.query.search
    
    const videos = database.read(search)
    
    return videos
})


server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})


server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id

    database.delete(videoId)
    
    return reply.status(204).send()
})


server.listen({
    port: 3333,
})

