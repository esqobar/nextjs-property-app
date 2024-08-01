import connectDB from "@/configs/database";
import {getUserSession} from "@/utils/getUserSession";
import Message from "@/models/Message";

export const dynamic = 'force-dynamic'

//GET /api/messages
export const GET = async () => {
    try {
        await connectDB()

        const sessionUser = await getUserSession()
        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', {status: 401})
        }
        const {userId} = sessionUser

        // const messages = await Message.find({ recipient: userId})
        //     .sort({ createdAt: -1})
        //     .populate('sender', 'username')
        //     .populate('property', 'name')

        const readMessages = await Message.find({ recipient: userId, read: true })
            .sort({ createdAt: -1})
            .populate('sender', 'username')
            .populate('property', 'name')

        const unreadMessages = await Message.find({ recipient: userId, read: false })
            .sort({ createdAt: -1})
            .populate('sender', 'username')
            .populate('property', 'name')

        const messages = [...unreadMessages, ...readMessages]

        return new Response(JSON.stringify(messages), { status: 200 })
    } catch(error) {
        console.log(error)
        return new Response('Something went wrong', { status: 500 })
    }
}

// POST /api/messages
export const POST = async (request) => {
    try {
        await connectDB()

        const { name, email, phone, message, recipient, property } = await request.json()

        const sessionUser = await getUserSession()
        if (!sessionUser || !sessionUser.userId) {
            return new Response('You must be logged in to send a message', { status: 401})
        }
        const {user} = sessionUser

        //cannot send message to self
        if ( user.id === recipient) {
            return new Response(JSON.stringify({
                message: 'Can not send message to yourself'
            }), { status: 400 })
        }

        const newMessage = new Message({
            sender: user.id,
            recipient,
            property,
            name,
            email,
            phone,
            body: message
        })
        await newMessage.save()

        return new Response(JSON.stringify({
            message: 'Message Sent'
        }), { status: 201 })
    } catch(error) {
        console.log(error)
        return new Response('Something went wrong', { status: 500 })
    }
}