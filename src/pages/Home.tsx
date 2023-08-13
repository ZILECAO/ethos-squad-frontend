import { EthosConnectStatus, ethos } from "ethos-connect";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import mintNft from "../lib/mintNft";
import { BackgroundProvider } from "../components/BackgroundProvider";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { status, wallet } = ethos.useWallet();

  const mint = useCallback(async () => {
    if (!wallet) {
      return;
    }
    setLoading(true);
    const mintResult = await mintNft(wallet);
    setLoading(false);
    if (mintResult.error) {
      console.error("ERROR:", mintResult.error);
      toast("Oops! There was an error minting your Squad member.", {
        type: "error",
      });
    } else {
      console.log(mintResult);
      const mintResultData = mintResult.result.data.display.data;
      toast(`Congrats, you just minted ${mintResultData.name}!`, {
        type: "success",
        icon: (
          <img
            src={mintResultData.image_url}
            alt={mintResultData.description}
          />
        ),
      });
    }
  }, [wallet]);

  return (
    <section className="flex justify-center items-center max-w-screen mt-14 lg:mt-0 px-8 min-h-screen">
      <div className="gap-24 lg:flex items-start justify-between max-w-full mt-12">
        {/* left side of screen */}
        <div>
          <div className="max-w-xl border bg-zinc-800 bg-opacity-30 border-zinc-700 p-4 lg:px-20 transition duration-700 ease-in-out backdrop-blur-md shadow-xs shadow-black hover:shadow-2xl hover:shadow-blue-400">
            <span className="flex gap-2">
              <h1 className="text-4xl font-light tracking-tight text-yellow-100 sm:text-6xl">
                TradingView
              </h1>
              <h1 className="text-4xl font-bold tracking-tight text-yellow-100 sm:text-6xl mb-64">
                Here
              </h1>
            </span>

            {status === EthosConnectStatus.Connected ? (
              <div className="mt-10 flex items-center gap-x-6">
                <button
                  className="rounded-md bg-yellow-100 px-4 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300 transition duration-700 ease-in-out"
                  onClick={mint}
                  disabled={loading}
                >
                  {loading ? "Minting..." : "Mint a Squad Member"}
                </button>

                <a
                  href="/my-squad"
                  className="text-sm font-semibold leading-6 text-yellow-100"
                >
                  See your Squad <span aria-hidden="true">→</span>
                </a>
              </div>
            ) : (
              <button
                className="rounded-md bg-yellow-100 px-4 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300 transition duration-700 ease-in-out"
                onClick={ethos.showSignInModal}
              >
                Connect Wallet to Mint
              </button>
            )}
          </div>
        </div>
        <div className="mt-12 lg:mt-0 mb-12">
          {/* Right side of screen  */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="transition duration-700 ease-in-out backdrop-blur-md shadow-xs shadow-black hover:shadow-2xl hover:shadow-blue-400">
              <div className="px-6 py-4 text-center bg-zinc-800 bg-opacity-30 border border-zinc-700">
                <h3 className=" font-medium text-2xl text-yellow-100 mb-[48vh] mx-12">
                  Orderbook
                </h3>
              </div>
            </div>

            <div className="transition duration-700 ease-in-out backdrop-blur-md  shadow-xs shadow-black hover:shadow-2xl hover:shadow-blue-400">
              <div className="px-4 py-4 text-center bg-zinc-800 bg-opacity-30 border border-zinc-700">
                <h3 className=" font-medium text-2xl mb-[48vh] text-yellow-100">
                  Spot
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
