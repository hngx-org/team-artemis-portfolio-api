import { GreetingResponse } from "../interfaces";

export const sayHelloService = async (): Promise<GreetingResponse> => {
  return { greeting: "Hello World 🌍" };
};
