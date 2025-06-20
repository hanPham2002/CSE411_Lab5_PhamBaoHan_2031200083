import axios from "axios";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { Text, View } from "react-native";

type AuthenContextType = {
  userToken: string | null;
  name: string | null;
  signIn: (phone: string, password: string) => void;
  signOut: () => void;
  isLoading: false;
};
const AuthenContext = createContext<AuthenContextType>({
  userToken: null,
  name: null,
  signIn: () => {},
  signOut: () => {},
  isLoading: false,
});

export function useAuthenContext() {
  return useContext(AuthenContext);
}
const AuthenProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [name, setName] = useState("");
  async function handleLogIn(phone: string, password: string) {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://kami-backend-5rs0.onrender.com/auth",
        {
          phone,
          password,
        }
      );
      const { name, token } = res.data;
      setUserToken(token);
      setName(name);
      setIsLoading(true);
      if (res.status == 200) {
        console.log("Successfully log in");
      } else {
        console.log("Unsuccessfully log in");
      }
    } catch (error) {
      console.log("Unsuccessfully log in");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <View>
      <Text>AuthenContext</Text>
    </View>
  );
};

export default AuthenProvider;
