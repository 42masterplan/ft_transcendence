import { UserInfoType, friendInfos } from "@/public/APIData";
import UserInfoCard from "@/components/card/UserInfoCard/UserInfoCard";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/ui/card";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">Home</h1>
        {/* // remove introduction from friendInfos */}
        {friendInfos.map((friendInfo: UserInfoType) => (
          <UserInfoCard
            key={friendInfo.id}
            name={friendInfo.name}
            profile_image={friendInfo.profile_image}
            current_status={friendInfo.current_status}
            side="left"
          />
        ))}
    </div>

  );
}
