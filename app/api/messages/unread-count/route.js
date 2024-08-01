import connectDB from "@/configs/database";
import {getUserSession} from "@/utils/getUserSession";
import Message from "@/models/Message";

export const dynamic = 'force-dynamic';

// GET /api/messages/unread-count
export const GET = async (request) => {
    try {
        await connectDB();

        const sessionUser = await getUserSession();

        if (!sessionUser || !sessionUser.user) {
            return new Response('User ID is required', {
                status: 401,
            });
        }

        const { userId } = sessionUser;

        const count = await Message.countDocuments({
            recipient: userId,
            read: false,
        });

        return new Response(JSON.stringify(count), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', { status: 500 });
    }
};