"use server";
import { parseFormData, sendEvent } from "basehub/events";

export async function formAction(formData: FormData, props: any) {
  try {
    // Web3Forms submission
    const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: "New Form Submission",
        ...Object.fromEntries(formData.entries()),
      }),
    });

    const web3formsResult = await web3formsResponse.json();
    if (!web3formsResult.success) return { success: false };

    // BaseHub submission
    const parsedData = parseFormData(
      props.submissions.ingestKey,
      props.submissions.schema,
      formData,
    );
    
    if (!parsedData.success) return { success: false };
    
    await sendEvent(
      props.submissions.ingestKey,
      parsedData.data,
    );

    return { success: true };
  } catch (error) {
    console.error("Form Action Error:", error);
    return { success: false };
  }
}