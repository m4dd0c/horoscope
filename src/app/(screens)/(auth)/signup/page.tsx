import Signup from "@/components/Forms/Signup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br dark:from-zinc-800 dark:to-zinc-950 from-zinc-50 to-zinc-150 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Horoscope Signup ✨
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Signup />
        </CardContent>
      </Card>
    </div>
  );
}
