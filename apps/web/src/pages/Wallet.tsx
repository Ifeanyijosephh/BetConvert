import React, { useState } from "react";
import { Copy, Check, ShieldCheck, Building2 } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useAuth } from "../hooks/useAuth";

export const Wallet: React.FC = () => {
  const { user, balance } = useAuth();
  const [accountCopied, setAccountCopied] = useState(false);

  const virtualAccount = {
    bankName: "Wema Bank / PocketFi",
    accountNumber: "0239481029",
    accountName: `BETCONVERT-${user?.email?.split("@")[0]?.toUpperCase() || "USER"}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(virtualAccount.accountNumber);
    setAccountCopied(true);
    setTimeout(() => setAccountCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 md:py-6 flex flex-col gap-5 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl uppercase tracking-tight text-text-primary">
            My <span className="text-brand">Wallet</span>
          </h1>
          <p className="text-xs text-text-secondary">Instant credit funding via automated bank transfer</p>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-surface to-surface-subtle border-brand/30 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Available Balance</span>
          <Badge variant="brand">₦200 = 1 Credit</Badge>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-4xl font-black text-brand tracking-tight tabular-nums">
            {balance}
          </span>
          <span className="text-sm font-bold uppercase text-text-secondary">Credits</span>
          <span className="text-xs text-text-muted ml-auto font-mono">
            ≈ ₦{(balance * 200).toLocaleString()}
          </span>
        </div>
      </Card>

      <Card className="flex flex-col gap-3.5">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-brand" />
          <h2 className="font-display font-bold text-sm uppercase text-text-primary">
            Dedicated Deposit Account
          </h2>
        </div>
        <p className="text-xs text-text-secondary">
          Transfer any amount to your unique account number below. Your wallet will be credited automatically within 10 seconds.
        </p>

        <div className="bg-surface-subtle rounded-xl p-3.5 border border-border-subtle flex flex-col gap-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-text-muted">Bank Name</span>
            <span className="font-bold text-text-primary">{virtualAccount.bankName}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-text-muted">Account Name</span>
            <span className="font-bold text-text-primary">{virtualAccount.accountName}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-border-subtle">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-text-muted">Account Number</span>
              <span className="font-mono text-lg font-black tracking-widest text-text-primary">
                {virtualAccount.accountNumber}
              </span>
            </div>
            <Button
              size="sm"
              variant={accountCopied ? "primary" : "secondary"}
              onClick={handleCopy}
              leftIcon={accountCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {accountCopied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-text-muted">
          <ShieldCheck className="w-3.5 h-3.5 text-brand" />
          <span>Secured by PocketFi & CBN-licensed banking partners</span>
        </div>
      </Card>
    </div>
  );
};
