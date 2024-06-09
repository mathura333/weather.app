const isInServer = () => {
  return typeof window === "undefined";
};

export default isInServer;
