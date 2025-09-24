// import { useModalStore } from "~/stores/useModalStore";
import { ofetch } from "ofetch";

const config = useRuntimeConfig();
const apiBaseUrl = config.public.apiBase;
type ContactEmail = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

type QuoteRequest = {
  name: string;
  email: string;
  products: {
    id: string;
    name: string;
    quantity: number;
  }[];
};

export const sendContactEmail = async (
  contactData: ContactEmail
): Promise<any | null> => {
  try {
    const response = await ofetch(`${apiBaseUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: contactData,
    });
    // modal.openModal("email-sent");
    return response || null;
  } catch (error) {
    console.error("Error enviando email de contacto:", error);
    return null;
  }
};

export const sendQuoteRequest = async (
  quoteRequestData: QuoteRequest
): Promise<any | null> => {
  try {
    const response = await ofetch(`${apiBaseUrl}/api/quote-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: quoteRequestData,
    });
    // modal.openModal("email-sent");
    return response || null;
  } catch (error) {
    console.error("Error enviando la solicitud de cotización:", error);
    return null;
  }
};

export default {
  sendContactEmail,
};
