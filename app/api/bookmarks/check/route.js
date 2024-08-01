import connectDB from "@/configs/database";
import {getUserSession} from "@/utils/getUserSession";
import User from "@/models/User";

export const dynamic = 'force-dynamic'

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

        return new Response(JSON.stringify({ isBookmarked}),
            { status: 200 })
    } catch(error) {
        console.error(error)
        return new Response('Something went wrong', { status: 500 })
    }
}