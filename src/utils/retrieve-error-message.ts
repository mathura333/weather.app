const retrieveErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  if (typeof error === "object") {
    return JSON.stringify(error);
  }

  return "Unknown error occurred";
};

export default retrieveErrorMessage;
