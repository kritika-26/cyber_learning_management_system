import nodemailer from "nodemailer";

let transporter;

// Initialize Nodemailer Transporter
const getTransporter = async () => {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    // Production / Configured SMTP Transporter
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT) || 587,
      secure: parseInt(SMTP_PORT) === 465, // true for 465, false for others
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
    console.log("Nodemailer SMTP Transporter configured.");
  } else {
    // Development / Ethereal Mail Fallback
    try {
      console.log("No SMTP credentials found in env. Creating Ethereal Test Account...");
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log(`Nodemailer Ethereal Transporter configured. User: ${testAccount.user}`);
    } catch (err) {
      console.error("Failed to create Ethereal Mail test account. Emails will fail silently.", err);
      // Create a dummy no-op transporter so the application does not crash
      transporter = {
        sendMail: async (options) => {
          console.log(`[Offline Mailer] Would send email to: ${options.to}`);
          return { messageId: "offline-mock-id" };
        }
      };
    }
  }
  return transporter;
};

// Send email function
export const sendEmail = async ({ to, subject, html }) => {
  try {
    const client = await getTransporter();
    const mailOptions = {
      from: process.env.SMTP_FROM || '"INTEXIA Support" <noreply@intexia.com>',
      to,
      subject,
      html,
    };

    const info = await client.sendMail(mailOptions);
    console.log(`Email sent successfully: ${info.messageId}`);
    
    // Log Ethereal preview link if applicable
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`✉ Ethereal Email Preview URL: ${previewUrl}`);
    }
    return info;
  } catch (err) {
    console.error(`Error sending email to ${to}:`, err);
  }
};
