import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StartEnrichmentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, operator: "OR" | "AND") => void;
  defaultName?: string;
}

export function StartEnrichmentModal({
  open,
  onClose,
  onSubmit,
  defaultName = "",
}: StartEnrichmentModalProps) {
  const [enrichmentName, setEnrichmentName] = useState(defaultName);
  const [operator, setOperator] = useState<"OR" | "AND">("OR");

  const handleSubmit = () => {
    console.log('handleSubmit called', { enrichmentName, operator });
    if (!enrichmentName.trim()) {
      console.log('Enrichment name is empty, returning');
      return;
    }
    console.log('Calling onSubmit with:', { enrichmentName, operator });
    onSubmit(enrichmentName, operator);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Start Enrichment</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Enrichment Name */}
          <div className="space-y-2">
            <Label htmlFor="enrichment-name">Enrichment Name</Label>
            <Input
              id="enrichment-name"
              value={enrichmentName}
              onChange={(e) => setEnrichmentName(e.target.value)}
              placeholder="Enter enrichment name"
              autoFocus
            />
          </div>

          {/* Operator Selection */}
          <div className="space-y-2">
            <Label>Operator</Label>
            <p className="text-sm text-muted-foreground">
              Choose whether uploaded contact details must match any single
              mapped field (OR) or all mapped fields (AND).
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={operator === "OR" ? "default" : "outline"}
                onClick={() => setOperator("OR")}
                className={`flex-1 ${
                  operator === "OR"
                    ? "bg-blue-600 hover:bg-blue-700 text-white ring-2 ring-blue-600 ring-offset-2"
                    : "hover:bg-gray-100"
                }`}
              >
                OR
              </Button>
              <Button
                type="button"
                variant={operator === "AND" ? "default" : "outline"}
                onClick={() => setOperator("AND")}
                className={`flex-1 ${
                  operator === "AND"
                    ? "bg-blue-600 hover:bg-blue-700 text-white ring-2 ring-blue-600 ring-offset-2"
                    : "hover:bg-gray-100"
                }`}
              >
                AND
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {operator === "OR"
                ? "OR: Broader reach - matches if any field matches (recommended)"
                : "AND: Higher precision - matches only if all fields match"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!enrichmentName.trim()}
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
