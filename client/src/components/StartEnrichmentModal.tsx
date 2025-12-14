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
  const [nameError, setNameError] = useState<string>("");

  const validateName = (name: string): boolean => {
    if (!name || name.trim().length === 0) {
      setNameError("Enrichment name is required");
      return false;
    }
    if (name.trim().length < 3) {
      setNameError("Name must be at least 3 characters");
      return false;
    }
    if (name.length > 100) {
      setNameError("Name must be less than 100 characters");
      return false;
    }
    setNameError("");
    return true;
  };

  const handleNameChange = (value: string) => {
    setEnrichmentName(value);
    if (nameError) {
      validateName(value);
    }
  };

  const handleSubmit = () => {
    console.log('📝 [MODAL] Submit clicked:', { enrichmentName, operator });
    
    if (!validateName(enrichmentName)) {
      console.error('❌ [MODAL VALIDATION] Name validation failed');
      return;
    }
    
    console.log('✅ [MODAL] Validation passed, calling onSubmit');
    onSubmit(enrichmentName.trim(), operator);
  };

  const isValid = enrichmentName.trim().length >= 3 && enrichmentName.length <= 100;

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
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Enter enrichment name"
              autoFocus
              className={nameError ? "border-red-500" : ""}
            />
            {nameError && (
              <p className="text-sm text-red-600 mt-1">{nameError}</p>
            )}
            {enrichmentName.trim().length > 0 && !nameError && (
              <p className="text-xs text-green-600 mt-1">
                ✓ Valid name ({enrichmentName.trim().length} characters)
              </p>
            )}
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
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!isValid}
            type="button"
            className={!isValid ? "opacity-50 cursor-not-allowed" : ""}
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
