import nodemailer from 'nodemailer';

export const smtpService=async (email:string,newPassword:string)=>{
try{
    // Configuration de l'envoi d'email
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST as string,
    port: Number(process.env.SMTP_PORT) as number,
    secure: true,
    auth: {
      user: process.env.SMTP_USER as string,
      pass: process.env.SMTP_PASSWORD as string
    }
      });
  
      // Contenu de l'email
      const mailOptions = {
        from: process.env.SMTP_USER ,
        to: email,
        subject: 'Password Recovery',
        html: `
        <h1>Password of user</h1>
        <p>We changed your old password by another one so you can use the password below.</p>
        <p>Your new password :${newPassword} .</p>
        <p>Best regards,</p>
        <p>PairPlay Company</p>
    `,
      };
      // Envoyer l'email
      const info = await transporter.sendMail(mailOptions);
      console.log(`Confirmation email sent to ${email}: ${info.response}`);
    }catch(error){
    console.error(`Error sending confirmation email: ${error}`);
    }
}