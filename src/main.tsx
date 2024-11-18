import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { isEnvBrowser } from "./utils/misc.ts";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import './index.css';

const root = document.getElementById('root');

if (isEnvBrowser()) {

  // https://i.imgur.com/iPTAdYV.png - Night time img
  root!.style.backgroundImage = 'url("https://i.imgur.com/iPTAdYV.png")';
  root!.style.backgroundSize = 'cover';
  root!.style.backgroundRepeat = 'no-repeat';
  root!.style.backgroundPosition = 'center';
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});

ReactDOM.createRoot(root! as HTMLElement).render(
	<React.StrictMode>
		<MantineProvider theme={theme} defaultColorScheme='dark'>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</MantineProvider>
	</React.StrictMode>
)
