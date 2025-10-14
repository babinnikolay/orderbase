import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/*<Image*/}
      {/*  src={logo}*/}
      {/*  quality={100}*/}
      {/*  height="60"*/}
      {/*  width="60"*/}
      {/*  alt={`${process.env.APP_NAME} logo`}*/}
      {/*/>*/}
      <span className="text-xl font-semibold text-primary-100">
        {process.env.APP_NAME}
      </span>
    </Link>
  );
}

export default Logo;
