import nodemailer from "nodemailer"
import User from "@/models/userModels"
import bcryptjs from "bcryptjs"


export const sendMail = async({email, emailType, userId})=>{
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === "Verify"){
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "6dd8bac2257562",
              pass: "10f19889da063a"
            }
          });

          const mailOptions = {
            from: "olid@gmail.com",
            to: email,
            subject: emailType === "Verify" ? "Verify your email" : "Reset your password",
            html: emailType === "Verify" ? `<p> 
                    Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> here </a> 
                    to Verify your email
                    OR <br>
                    Click the link bellow: <br>
                    ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                    </p>`:
                    `<p> 
                    Click <a href="${process.env.DOMAIN}/resetPassword?token=${hashedToken}"> here </a> 
                    to Reset your password
                    OR <br>
                    Click the link bellow: <br>
                    ${process.env.DOMAIN}/resetPassword?token=${hashedToken}
                    </p>`
          }

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse

    } catch (error) {
        throw new Error(error.message)
    }
}