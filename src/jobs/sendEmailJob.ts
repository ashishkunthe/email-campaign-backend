import { sendEmail } from "../utils/sendEmails.js";

export default (agenda: any) => {
  agenda.define("send-email", async (job: any) => {
    const { to, subject, html, flowId, nodeId } = job.attrs.data;

    console.log(`📧 Sending email to ${to} from flow ${flowId}`);

    try {
      await sendEmail({ to, subject, html, flowId, nodeId });
      console.log(`✅ Email sent to ${to}`);
    } catch (err) {
      console.error(`❌ Failed to send email to ${to}:`, err);
    }
  });
};
