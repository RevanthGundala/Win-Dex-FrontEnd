import Link from "next/link";
export default function Main() {
  return (
    <div className="bg-blue-500 h-screen flex justify-around items-center">
      <Link href="/SwapTokens">
        <a className=" bg-sky-400 hover:bg-red-500 py-2 px-8 text-neutral-50 text-lg rounded-full">
          Swap
        </a>
      </Link>

      <Link href="/LiquidityPools">
        <a className=" bg-sky-400 hover:bg-red-500 py-2 px-8 text-neutral-50 text-lg rounded-full">
          Pools
        </a>
      </Link>
    </div>
  );
}
