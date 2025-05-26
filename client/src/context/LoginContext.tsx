import { createContext, useState } from "react";
import { ReactNode } from "react";

interface LoginContextType {
	isLoggedIn: boolean;
	setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginContext = createContext<LoginContextType>({
	isLoggedIn: false,
	setLogin: () => {},
});

const LoginProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setLogin] = useState(false);

	return (
		<LoginContext.Provider value={{isLoggedIn, setLogin}}>
			{children}
		</LoginContext.Provider>
	);
}

export default LoginProvider