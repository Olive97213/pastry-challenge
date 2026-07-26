import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle2 } from "lucide-react";

export default function AccountPage() {
  return (
    <Card className="w-full border-border/60 shadow-sm">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <UserCircle2 className="h-5 w-5" />
          <CardTitle className="text-2xl">Mon compte</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Connecte-toi ou crée un compte pour accéder à tes recettes et à ton profil.
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Utilise les formulaires ci-dessous pour te connecter ou créer ton compte.
        </p>
      </CardContent>
    </Card>
  );
}
