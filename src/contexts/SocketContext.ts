import { createContext } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

// @ts-ignore
const SocketContext = createContext<Socket<DefaultEventsMap, DefaultEventsMap>>(null);

export default SocketContext;
