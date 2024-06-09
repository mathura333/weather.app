import retrieveErrorMessage from "utils/retrieve-error-message";

const apiCaller = async <T>(endpoint: string, options?: RequestInit) => {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      ...(options || {}),
      headers: {
        ...(options?.headers || {}),
        "Content-Type": "application/json",
      },
    });

    const content = await response.json();

    if (response.status >= 400) {
      throw new Error(content?.message || "Something went wrong");
    }

    return content as T;
  } catch (err) {
    const errorMessage = retrieveErrorMessage(err);

    throw new Error(errorMessage);
  }
};

export default apiCaller;
