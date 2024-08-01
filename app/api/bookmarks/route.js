import connectDB from "@/configs/database";
import {getUserSession} from "@/utils/getUserSession";
import User from "@/models/User";
import Property from "@/models/Property";

export const dynamic = 'force-dynamic'

// GET /api/bookmarks
export const GET = async (request) => {
    try {
        await connectDB()

        const sessionUser = await getUserSession()
        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401})
        }
        const {userId} = sessionUser
        //finding user in the db
        const user = await User.findOne({ _id: userId })

        //get users bookmarks
        const bookmarks = await Property.find({ _id: {$in: user.bookmarks }})

        return new Response(JSON.stringify(bookmarks),
            { status: 200 })
    } catch(error) {
        console.log(error)
        return new Response('Something went wrong', { status: 500 })
    }
}

export const POST = async (request) => {
    try {
        await connectDB()

        const { propertyId } = await request.json()
        const sessionUser = await getUserSession()
        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401})
        }
        const {userId} = sessionUser
        //finding user in the db
        const user = await User.findOne({ _id: userId })

        //checking if property is bookmarked
        let isBookmarked = user.bookmarks.includes(propertyId)
        let message;
        if (isBookmarked) {
            //if already bookmarked, remove it
            user.bookmarks.pull(propertyId)
            message = 'Bookmark removed successfully'
            isBookmarked = false
        } else {
            //if already bookmarked, remove it
            user.bookmarks.push(propertyId)
            message = 'Bookmark added successfully'
            isBookmarked = true
        }

        await user.save()

        return new Response(JSON.stringify({
            message, isBookmarked
        }), { status: 200 })
    } catch(error) {
        console.log(error)
        return new Response('Something went wrong', { status: 500 })
    }
}