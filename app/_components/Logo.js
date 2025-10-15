import Link from "next/link";
import * as appConstants from "@/app/_helpers/appConstants";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/*<Image*/}
      {/*  src={logo}*/}
      {/*  quality={100}*/}
      {/*  height="60"*/}
      {/*  width="60"*/}
      {/*  alt={`${appConstants.APP_NAME} logo`}*/}
      {/*/>*/}
      <span className="text-xl font-semibold text-primary-100">
        {appConstants.APP_NAME}
      </span>
    </Link>
  );
}

export default Logo;
