export const getRequiredHeight: () => string = () => {
  const height = window.innerHeight;
  console.log(height);
  return (height - 24).toString();
};
