export default function createContext(defaultValue = undefined) {
  let ctx = defaultValue;
  const getContext = () => {
    return ctx;
  };
  const setContext = (context) => {
    ctx = context;
  };
  return [getContext, setContext];
}
