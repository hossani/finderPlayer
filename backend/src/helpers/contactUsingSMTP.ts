import nodemailer from 'nodemailer';

export const smtpServiceForContact=async (name:string,email:string,subject:string,message:string,)=>{
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
        to: process.env.EMAIL,
        subject: `${subject}`,
        html: `
        <h1>Name of the user: ${name}</h1>
        <h2>Email of the user: ${email}</h2>
        <p>Message:</p>
        <p>${message} .</p>
   
    `,
      };
      // Envoyer l'email
      const info = await transporter.sendMail(mailOptions);
      console.log(`Confirmation email sent to ${email}: ${info.response}`);
    }catch(error){
    console.error(`Error sending confirmation email: ${error}`);
    }
}