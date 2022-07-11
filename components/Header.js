import Link from "next/link";
import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <div>
      <div className="text-3xl flex justify-center">
        <Link href="/">
          <a>WINDEX</a>
        </Link>
      </div>
      <div className="ml-auto py-2 px-4">
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  );
}
