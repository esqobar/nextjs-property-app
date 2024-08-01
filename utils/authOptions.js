import GoogleProvider from 'next-auth/providers/google'
import connectDB from "@/configs/database";
import User from "@/models/User";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    callbacks: {
        async signIn({ profile }){
            //1. connect to db
            await connectDB()
            //2. check if user exists
            const userExists = await User.findOne({ email: profile.email })
            //3. if not, then add user to db
            if (!userExists) {
                //truncate username if too long
                const username = profile.name.slice(0, 20)

                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture
                })
            }
            //4. return true to allow SignIn
            return true
        },
        async session({ session }){
            //1. Get user from DB
            const user = await User.findOne({ email: session.user.email })
            //2. Assign the user id to the session
            session.user.id = user._id.toString()
            //3. return session
            return session
        },
    }
}