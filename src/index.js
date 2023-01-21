import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {
  WagmiConfig,
  createClient,
  configureChains,
  useSigner,
  chain
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { ConnectKitProvider } from "connectkit";
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Buffer } from "buffer";
import { ChainId, ThirdwebSDKProvider } from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

if (!window.Buffer) window.Buffer = Buffer;
const queryClient = new QueryClient();

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygon],
  [alchemyProvider({ apiKey: `${process.env.REACT_APP_ALCHEMY_KEY}`, priority: 0 })],
  [publicProvider({ priority: 1 })],
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
        qrcodeModalOptions: {
          mobileLinks: ['paper'],
          desktopLinks: ['paper'],
        },
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

function ThirdwebProvider({ wagmiClient, children }) {
  const { data: signer } = useSigner();

  return (
    <ThirdwebSDKProvider
      desiredChainId={ChainId.Polygon}
      signer={signer}
      provider={wagmiClient.provider}
      queryClient={wagmiClient.queryClient}
      sdkOptions={{
        gasless: {
          openzeppelin: {
            relayerUrl: process.env.REACT_APP_WEBHOOK_URL,
          },
        },
      }}
    >
      {children}
    </ThirdwebSDKProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <BrowserRouter>
          <ThirdwebProvider wagmiClient={client}>
            <QueryClientProvider client={queryClient} contextSharing={true}>
              <App />
            </QueryClientProvider>
          </ThirdwebProvider>
        </BrowserRouter>
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
