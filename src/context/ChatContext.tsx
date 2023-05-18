import { createContext, useContext, useReducer } from "react";
import { User } from "firebase/auth";
import { AuthContext } from "./AuthContext";

interface StateType {
  chatId: string | null;
  user: User;
}

interface ActionType {
  type: string;
  payload: any;
}

export interface ChatContextType {
  data: StateType;
  dispatch: React.Dispatch<ActionType>;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export type ChatContextProviderProps = {
  children: React.ReactNode;
};

export const ChatContextProvider: React.FC<ChatContextProviderProps> = ({
  children,
}) => {
  
  const { currentUser } = useContext(AuthContext);

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  //Disptach this action to update the user and chat ID
  const chatReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser //check if currentUser and user exists first to avoid error
            ? currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid
            : "",
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
