import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

interface ErrorFallbackProps {
  title?: string;
  description?: string;
  compact?: boolean;
}

export const ErrorFallback = ({
  title = "ATMURA sahifasini yuklashda xatolik yuz berdi",
  description = "Ilova ishlashda davom etadi. Sahifani yangilang yoki bosh sahifaga qayting.",
  compact = false
}: ErrorFallbackProps) => (
  <Card className={compact ? "text-center" : "mx-auto max-w-2xl text-center"}>
    <div className={compact ? "space-y-3" : "space-y-4 py-4"}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/20 bg-amber-500/12 text-amber-100">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <div>
        <p className="font-['Space_Grotesk'] text-xl font-bold text-white">{title}</p>
        <p className="mt-2 text-sm leading-6 text-white/62">{description}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="secondary" onClick={() => window.location.reload()}>
          <RefreshCcw className="h-4 w-4" />
          Yangilash
        </Button>
        <Link to="/">
          <Button>
            <Home className="h-4 w-4" />
            Bosh sahifa
          </Button>
        </Link>
      </div>
    </div>
  </Card>
);
