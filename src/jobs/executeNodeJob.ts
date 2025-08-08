import flowModels from "../models/flowModels.js";
import { sendEmail } from "../utils/sendEmails.js";

export default (agenda: any) => {
  agenda.define("execute-node", async (job: any) => {
    const { flowId, nodeId } = job.attrs.data;

    // 1. Get the flow from DB
    const flow = await flowModels.findById(flowId);
    if (!flow) {
      console.error(`❌ Flow ${flowId} not found`);
      return;
    }

    // 2. Get current node
    const node = flow.nodes.find((n) => n.id === nodeId);
    if (!node) {
      console.error(`❌ Node ${nodeId} not found`);
      return;
    }

    console.log(`▶️ Executing node: ${node.type} (${node.id})`);

    // 3. Handle email nodes
    if (node.type === "email") {
      if (!node.data?.to || !node.data?.subject || !node.data?.body) {
        console.error(`⚠️ Missing email fields in node ${node.id}`);
        return;
      }

      await sendEmail({
        to: node.data.to,
        subject: node.data.subject,
        html: `<p>${node.data.body}</p>`,
        flowId,
        nodeId,
      });

      console.log(`📧 Email sent to ${node.data.to}`);
    }

    // 4. Find the next node
    const edge = flow.edges.find((e) => e.source === node.id);
    if (!edge) {
      console.log(`✅ Flow ${flowId} completed`);
      return;
    }

    const nextNode = flow.nodes.find((n) => n.id === edge.target);
    if (!nextNode) {
      console.error(`❌ Next node ${edge.target} not found`);
      return;
    }

    // 5. Schedule the next node
    if (nextNode.type === "wait") {
      if (!nextNode.data?.delay) {
        console.error(`⚠️ No delay set for wait node ${nextNode.id}`);
        return;
      }

      console.log(
        `⏳ Waiting ${nextNode.data.delay} before executing next node`
      );
      await agenda.schedule(`in ${nextNode.data.delay}`, "execute-node", {
        flowId,
        nodeId: nextNode.id,
      });
    } else {
      console.log(`➡️ Moving immediately to next node ${nextNode.id}`);
      await agenda.now("execute-node", { flowId, nodeId: nextNode.id });
    }
  });
};
