import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

import { LuUser } from "react-icons/lu";

const UserIcon = async () => {
  const user = await currentUser();
  const profileImage = user?.imageUrl;
  if (profileImage) {
    return (
      <Image
        src={profileImage}
        width={24}
        height={24}
        className="w-6 h-6 rounded-full object-cover"
        alt="clerk"
        unoptimized
      />
    );
  }
  return <LuUser className="w-6 h-6 bg-primary rounded-full text-white " />;
};

export default UserIcon;
